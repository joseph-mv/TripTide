import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapPopup.css";
import { useSelector } from "react-redux";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MapPopup({ setMap, startingPoint, places }) {
  const coordinates = [[startingPoint.longitude, startingPoint.latitude]];
  console.log(places);
  places.map((place) => coordinates.push(place.place.location.coordinates));
  // console.log(coordinates)
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    // console.log("map");
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      // center: [77.5, 14],
      zoom: 12,
    });
    mapRef.current = map;
    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
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

      const bounds = new mapboxgl.LngLatBounds()
        .extend(coordinates[0])
        .extend(coordinates[coordinates.length - 1]);
      map.fitBounds(bounds, { padding: 50 });

      map.addControl(new mapboxgl.FullscreenControl());
    });

    return () => map.remove();
  }, [places]);

  useEffect(() => {
    Object.keys(places).forEach((key,index) => {
      const place = places[key];
      const el = document.createElement("div");
      el.className = "marker";

      const number = document.createElement("span");
      number.className = "marker-text";
      number.textContent = index+1;

      const img = document.createElement("img");
      img.src = "../../../icons/destination.png";
      img.className = "marker-image";

      el.appendChild(number);
      el.appendChild(img);

      const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(place.place.location.coordinates)
            .addTo(mapRef.current);
            console.log(index)
            const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<p style="color: black;">${index+1} : ${place.place.siteLabel}</p>`);
          
            marker.setPopup(popup);  
    })
   
  }, [places])
  

  return (
    <div className="mapPopup-container">
      <div className="mapPopup-position" ref={mapContainerRef}>
        <button onClick={() => setMap((prev) => !prev)} className="closeBtn">
          X
        </button>
      </div>
    </div>
  );
}

export default MapPopup;
