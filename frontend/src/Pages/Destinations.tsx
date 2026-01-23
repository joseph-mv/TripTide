import { toast } from "react-toastify";
import { useRef, useEffect, useState } from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "../styles/pages/Destinations.css";
import { useForm } from "../hooks/useForm";
import { createMarker } from "../utils/createMarker";
import DesForm from "../Components/destinations/DesForm";
import { useDestinationMap } from "../hooks/useDestinationMap";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import DesSpot from "../Components/destinations/DesSpot/DesSpot";
import { getNearbyDestinations } from "../services/api/destinationServices";
import { Destination } from "../types";
import { Marker } from "mapbox-gl";


type FormState = {
  place: string;
  coordinates: number[];
  distance: string;
  type: {
    "Tourist Attraction": boolean;
    "Tourist Destination": boolean;
    "Natural Park": boolean;
    "Waterfall": boolean;
    "Nature Reserve": boolean;
    "Dam": boolean;
    "Lake": boolean;
    "Hiking": boolean;
    "Caves": boolean;
    "Amusement Park": boolean;
    "Campsite": boolean;
    "City": boolean;
    "Beach": boolean;
    "Resort": boolean;
    "Historical monument": boolean;
    "Museum": boolean;
    "Zoo": boolean;
    "Desert": boolean;
  };
  activities: {
    sightseeing: boolean;
    adventure: boolean;
    shopping: boolean;
    relaxation: boolean;
    cultural: boolean;
    others: boolean;
  };
};


const initialForm: FormState = {
  place: "",
  coordinates: [],
  distance: "",
  type: {
    "Tourist Attraction": true,
    "Tourist Destination": false,
    "Natural Park": false,
    "Waterfall": false,
    "Nature Reserve": false,
    "Dam": false,
    "Lake": false,
    "Hiking": false,
    "Caves": false,
    "Amusement Park": false,
    "Campsite": false,
    "City": false,
    "Beach": false,
    "Resort": false,
    "Historical monument": false,
    "Museum": false,
    "Zoo": false,
    "Desert": false,
  },
  activities: {
    sightseeing: false,
    adventure: false,
    shopping: false,
    relaxation: false,
    cultural: false,
    others: false,
  },
};

/**
 * Destination page for showing destinations around  your current location or selected place
 * based on the radius(distance), activities, or types.
 */
function Destinations() {
  const placesRef = useRef<HTMLDivElement>(null); // Html div element
  const markersRef = useRef<Marker[]>([]); // Array for storing markers in map
  const [places, setPlaces] = useState<Destination[]>([]);

  //For show inputs while click on the buttons at right side of map
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const { form, loading, handleChange, handleSubmit, setForm, error } = useForm(
    initialForm,
    async () => {
      setPlaces([]);
      const response = await getNearbyDestinations(form); //api call
      setPlaces(response);
      placesRef.current?.scrollIntoView({ behavior: "smooth" }); //automatic scroll to places section
    }
  );
  useEffect(() => {
    if (error) toast.error(error)
  }, [error])


  const { lng, lat } = useCurrentLocation();

  // Load map
  const { mapContainerRef, mapRef } = useDestinationMap(setForm, lng, lat);

  // Marking places in the map
  useEffect(() => {
    if (places.length > 0) {
      places.forEach((place, i) => {
        if (!mapRef.current) return;
        const marker = createMarker(place, i).addTo(mapRef.current);
        markersRef.current.push(marker);
      });
      if (!mapRef.current) return;
      // Adjust zoom level after marking
      mapRef.current.zoomTo(4, {
        duration: 2000,
        offset: [100, 50],
      });
    }
    return () => {
      markersRef.current.forEach((marker) => marker.remove()); // remove markers from the map
      markersRef.current = [];
    };
  }, [places]);

  return (
    <div className="destinations-container">
      <h1>Destinations</h1>

      {/* Map and inputs */}
      <div
        className="des-map-container"
        onMouseLeave={() => setActiveInput(null)}
      >
        {/* Map */}
        <div className="des-map-position" ref={mapContainerRef}></div>

        {/* Inputs for filtering */}
        <DesForm
          form={form}
          handleChange={handleChange}
          activeInput={activeInput}
          setActiveInput={setActiveInput}
        />
      </div>

      <p>
        Discover your ideal adventure by filtering destinations based on
        location, type, and activities within a specific distance from your
        desired location. Find the perfect getaway tailored to your preferences.
      </p>

      <button className="btnFind" onClick={handleSubmit} disabled={loading}>
        🔍 {loading ? "Finding" : "Find"} Destinations
      </button>

      {/* Places after successful response */}
      <div ref={placesRef} className="places">
        {places.map((place, index) => (
          <DesSpot destination={place} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Destinations;
