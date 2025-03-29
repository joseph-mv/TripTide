import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "react-toastify";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import React, { useRef, useEffect, useState } from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "../styles/pages/Destinations.css";
import TouristSpots from "../Components/TouristSpots/TouristSpots";
import {  getNearbyDestinations } from "../services/api/destinationServices";

const types = [
  "Tourist Attraction",
  "Tourist Destination",
  "Natural Park",
  "Waterfall",
  "Nature Reserve",
  "Dam",
  "Lake",
  "Hiking",
  "Caves",
  "Amusement Park",
  "Campsite",
  "City",
  "Beach",
  "Resort",
  "Historical monument",
  "Museum",
  "Zoo",
  "Desert",
];
const activities = [
  "Sightseeing",
  "Adventure",
  "Shopping",
  "Relaxation",
  "Cultural",
];
function Destinations() {
  const mapContainerRef = useRef(null); //html div for map
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const placesRef = useRef();
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [form, setForm] = useState({
    place: "",
    coordinates: [],
    distance: "",
    type: {
      "Tourist Attraction": true,
      "Tourist Destination": false,
      "Natural Park": false,
      Waterfall: false,
      "Nature Reserve": false,
      Dam: false,
      Lake: false,
      Hiking: false,
      Caves: false,
      "Amusement Park": false,
      Campsite: false,
      City: false,
      Beach: false,
      Resort: false,
      "Historical monument": false,
      Museum: false,
      Zoo: false,
      Desert: false,
    },
    activities: {
      sightseeing: false,
      adventure: false,
      shopping: false,
      relaxation: false,
      cultural: false,
      others: false,
    },
  });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  //for show input while click on the button
  const [activeInput, setActiveInput] = useState(null);
  const handleSymbolClick = (inputName) => {
    setActiveInput(activeInput === inputName ? null : inputName);
  };

  //for distance types and activities
  const handleChange = (event) => {
    const { type, name, value, checked } = event.target;

    if (type === "number") {
      setForm({ ...form, [name]: Math.abs(value) });
    } else if (name === "activities") {
      setForm({
        ...form,
        [name]: { ...form[name], [value.toLowerCase()]: checked },
      });
    } else {
      setForm({ ...form, [name]: { ...form[name], [value]: checked } });
    }
  };

  // Load map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat], // Initial map center coordinates
      zoom: 0, // Initial map zoom level
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    if (lng && lat) {
      // Add a marker at the current location
      setForm((prev) => ({
        ...prev,
        coordinates: [lng, lat],
      }));
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

      map.setCenter([lng, lat]);
    }

    map.addControl(geocoder, "top-left");
    geocoder.on("result", (event) => {
      const placeName = event.result.place_name;
      const coordinates = event.result.geometry.coordinates;

      setForm((prev) => ({
        ...prev,
        place: placeName,
        coordinates: coordinates,
      }));
    });
    return () => map.remove();
  }, [lng, lat]);

  //current location of device mark on the map is it available
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      // console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  //fetch Destinations based on the filters
  const handleFilter = async () => {
    try {
      setPlaces([]);
      setLoading(true);
      const response = await getNearbyDestinations(form);
      setPlaces(response);
      placesRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error filtering destinations", error);
      toast.error(error.message );
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (places.length > 0) {
      places.forEach((place, i) => {
        const el = document.createElement("div");
        el.className = "marker";

        const number = document.createElement("span");
        number.className = "marker-text";
        number.textContent = i + 1;
        const img = document.createElement("img");
        img.src = "../../../icons/destination.png";
        img.className = "marker-image";

        el.appendChild(number);
        el.appendChild(img);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(place.location.coordinates)
          .addTo(mapRef.current);

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          i + 1 + " : " + place.siteLabel
        );
        marker.setPopup(popup);
        markersRef.current.push(marker);
      });
    }
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [places]);

  return (
    <div className="destinations-container">
      <h1>Destinations</h1>
      {/* <h1>Explore Your Next Destination</h1> */}

      <div
        className="des-map-container"
        onMouseLeave={() => setActiveInput(null)}
      >
        <div className="des-map-position" ref={mapContainerRef}></div>

        <div className="form-component">
          <div className="symbol-container">
            {activeInput === "distance" && (
              <input
                type="number"
                min="0"
                name="distance"
                value={form.distance}
                onChange={handleChange}
                placeholder="Distance in km..."
                className="input-field"
                autoFocus
              />
            )}
            <div
              className={`symbol  ${activeInput === "distance" && "clicked"}`}
              onClick={() => handleSymbolClick("distance")}
            >
              📏
            </div>
          </div>
          <div className="symbol-container">
            {activeInput === "type" && (
              <div className="checkbox-group">
                {types.map((type, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      onChange={handleChange}
                      value={type}
                      name="type"
                      checked={form.type[type]}
                    />{" "}
                    {type}
                  </label>
                ))}
              </div>
            )}
            <div
              className={`symbol  ${activeInput === "type" && "clicked"}`}
              onClick={() => handleSymbolClick("type")}
            >
              🌐
            </div>
          </div>
          <div className="symbol-container">
            {activeInput === "activities" && (
              <div className="checkbox-group">
                {activities.map((activity, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      onChange={handleChange}
                      value={activity}
                      name="activities"
                      checked={form.activities[activity.toLowerCase()]}
                    />{" "}
                    {activity}
                  </label>
                ))}
              </div>
            )}
            <div
              className={`symbol  ${activeInput === "activities" && "clicked"}`}
              onClick={() => handleSymbolClick("activities")}
            >
              🏃
            </div>
          </div>
        </div>
      </div>
      <p>
        Discover your ideal adventure by filtering destinations based on
        location, type, and activities within a specific distance from your
        desired location. Find the perfect getaway tailored to your preferences.
      </p>

      <button className="btnFind" onClick={handleFilter} disabled={loading}>
        🔍 Find Destinations
      </button>

      <div ref={placesRef} className="places">
        {places.map((place, index) => (
          <TouristSpots destination={place} index={index} locAround />
        ))}
      </div>
    </div>
  );
}

export default Destinations;
