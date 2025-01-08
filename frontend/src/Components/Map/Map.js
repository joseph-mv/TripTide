import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { refreshToken } from "../../utils/refreshToken";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map() {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const coordinates = useSelector((state) => state.location);
  const [loading, setLoading] = useState(true);
  const selectedPlaces = coordinates.selectedPlaces;
  var token = localStorage.getItem("token");


  useEffect(() => {
    if (coordinates.distance && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [77.5, 14],
        zoom: 12,
      });
      map.addControl(new mapboxgl.FullscreenControl());
      mapRef.current = map;

      const startingPoint = coordinates.startingPoint;
      const endpoint = coordinates.destination;
      const start = [startingPoint.longitude, startingPoint.latitude];
      const end = [endpoint.longitude, endpoint.latitude];

      //for route geometry in the map
      const route = coordinates.routeGeometry; 
      map.on("load", () => {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: route,
          },
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#007cbf",
            "line-width": 8,
          },
        });

        new mapboxgl.Marker().setLngLat(start).addTo(map); //starting point

        new mapboxgl.Marker().setLngLat(end).addTo(map);
        const bounds = new mapboxgl.LngLatBounds().extend(start).extend(end);
        map.fitBounds(bounds, { padding: 50 });
      });
      return () => map.remove();
    }
    setLoading(false);
  }, [coordinates.distance, mapContainerRef.current]);

  useEffect(() => {
    if (coordinates.selectedPlaces && mapRef.current) {
  
      Object.keys(markersRef.current).forEach((key) => {
        if (!coordinates.selectedPlaces[key]) {
          markersRef.current[key].remove();
          delete markersRef.current[key];
        }
      });
      Object.keys(selectedPlaces).forEach((key) => {
        if (!markersRef.current[key]) {
          const selectedPlace = selectedPlaces[key];
          const el = document.createElement("div");
          el.className = "marker";

          const number = document.createElement("span");
          number.className = "marker-text";
          number.textContent = selectedPlace.index;

          const img = document.createElement("img");
          img.src = "../../../icons/destination.png";
          img.className = "marker-image";

          el.appendChild(number);
          el.appendChild(img);

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(selectedPlace.place.location.coordinates)
            .addTo(mapRef.current);

          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            selectedPlace.index + " : " + selectedPlace.place.siteLabel
          );
          marker.setPopup(popup);

          markersRef.current[key] = marker;
        }
      });
    }
  }, [coordinates]);

  const handlePlan = () => {
    if (!token) {
      
      navigate("/authenticate");
      return;
    } else if (isTokenExpired(token)) {
  
      token = refreshToken();
      if (!token) navigate("/authenticate");
    }
    if (Object.keys(coordinates.selectedPlaces).length === 0)
      return alert("Select atleast one destination");
    navigate("itinerary");
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
