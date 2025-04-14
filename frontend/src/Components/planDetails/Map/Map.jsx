import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Map.css";
import { ROUTES } from "../../../routes";
import { usePlanMap } from "../../../hooks/usePlanMap";
import { createMarker } from "../../../utils/createMarker";

/**
 * Map component
 * for showing route and mark selected destinations on the map
 */
function Map() {
  const navigate = useNavigate();
  const markersRef = useRef({});
  const coordinates = useSelector((state) => state.location);
  const selectedPlaces = coordinates.selectedPlaces;

  const { loading, mapContainerRef, mapRef } = usePlanMap(coordinates);

  useEffect(() => {
    //unselecting destinations
    if (coordinates.selectedPlaces && mapRef.current) {
      Object.keys(markersRef.current).forEach((key) => {
        if (!coordinates.selectedPlaces[key]) {
          markersRef.current[key].remove(); //remove from map
          delete markersRef.current[key]; // remove from markerRef object
        }
      });
      //selecting destinations
      Object.keys(selectedPlaces).forEach((key) => {
        if (!markersRef.current[key]) {
          const selectedPlace = selectedPlaces[key];
          const marker = createMarker(
            selectedPlace.place,
            selectedPlace.index - 1
          ).addTo(mapRef.current);
          
          markersRef.current[key] = marker;
        }
      });
    }
  }, [coordinates]);

  const handlePlan = () => {
    if (Object.keys(coordinates.selectedPlaces).length === 0)
      return toast.error("Select atleaset one destination");
    navigate(ROUTES.CREATE_ITINERARY);
  };

  if (loading) {
    return <div className="map-container">Loading...</div>;
  }
  return (
    <div className="map-container">
      <div className="map-position" ref={mapContainerRef}></div>
      <button onClick={handlePlan} class={`itinerary-button `}>
        <i class="fa-solid fa-clipboard-list"></i> <span> Make Itinerary</span>
      </button>
    </div>
  );
}

export default Map;
