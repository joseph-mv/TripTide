import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Destinations.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import TouristSpots from "../TouristSpots/TouristSpots";
const BASE_URL = process.env.REACT_APP_BASE_URL;
function Destinations() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); 
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [form, setForm] = useState({
    place: "",
    coordinates: [ 75.8650148, 11.2621704 ],
    distance:"500",
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
  const [places,setPlaces]=useState([])
  // console.log(form)
 

  const handleChange = (event) => {
   
    const { type, name, value, checked } = event.target;
    // console.log(name)
    if (type === "text") {
      setForm({ ...form, [name]: value});
    } else if (name ==="activities"){
      setForm({ ...form, [name]: { ...form[name], [value.toLowerCase()]: checked } });
    }else{
      setForm({ ...form, [name]: { ...form[name], [value]: checked } });
   
    }
  };

  useEffect(() => {
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng,lat], // Initial map center coordinates
      zoom: 0, // Initial map zoom level
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
   
    if (lng && lat) {
      // Add a marker at the current location
      setForm((prev) => ({
        ...prev,
        coordinates: [lng,lat],
      }));
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);

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
  }, [lng,lat]);
// console.table(form.activities)
  useEffect(() => {
    if (navigator.geolocation) {
     
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);
  const [activeInput, setActiveInput] = useState(null);
  const handleSymbolClick = (inputName) => {
    setActiveInput(activeInput === inputName ? null : inputName);
  };
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

  const handleFilter=async()=>{
    console.log(form)
    if(form.coordinates.length===0){
      return alert("Please select a place")
    }

    
    try{
      const response = await axios.get(`${BASE_URL}/destinations`, {
        params: form,
      });
      if(response.data.length===0){
        alert("We couldn't find any locations that match your criteria. Please try adjusting your destination or explore different options.")
  }

  setPlaces(response.data)
    console.log(response.data)
    // localStorage.setItem('place', response.data)
    }catch(err){
      console.error("Error filtering destinations", err);
    }
  }

  useEffect(() => {
    // console.log(places)
    if(places.length > 0){
     
      places.forEach((place, i) => {
        
        const el = document.createElement("div");
        el.className = "marker";

        const number = document.createElement("span");
        number.className = "marker-text";
        number.textContent = i+1;
        const img = document.createElement("img");
        img.src = "../../../icons/destination.png";
        img.className = "marker-image";

        el.appendChild(number);
          el.appendChild(img);

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(place.location.coordinates)
            .addTo(mapRef.current);

            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
              i+1 + " : " + place.siteLabel
            );
            marker.setPopup(popup);
      })
    }
  }, [places])
  



  return (
    <div className="destinations-container">
      <h1>Destinations</h1>
      <div className="des-map-container">
        <div className="des-map-position" ref={mapContainerRef}></div>
        <div className="form-component">
          <div className="symbol-container">
            {activeInput === "distance" && (
              <input
                type="text"
                name="distance"
                value={form.distance}
                onChange={handleChange}
                placeholder="Distance in km..."
                className="input-field"
                
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
      <button className="btnFind" onClick={handleFilter}>🔍 Find Destinations</button>
            <div className="places">
              {
                places.map((place,index)=>
                  <TouristSpots destination={place} index={index} locAround/>
                )
              }

            </div>
    </div>
  );
}

export default Destinations;