import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapPopup.css";
import { SelectedPlace, Coords } from "../../types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapPopupProps {
  setMap: React.Dispatch<React.SetStateAction<boolean>>;
  startingPoint: Coords;
  places: SelectedPlace[];
}

function MapPopup({ setMap, startingPoint, places }: MapPopupProps) {
  const coordinates: [number, number][] = [[startingPoint.longitude, startingPoint.latitude]];

  places.forEach((place) => {
    if (place.place?.location?.coordinates) {
      coordinates.push(place.place.location.coordinates);
    }
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [startingPoint.longitude, startingPoint.latitude],
      zoom: 12,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.FullscreenControl());

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {}, // Added missing properties
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

      if (coordinates.length > 0) {
        const bounds = new mapboxgl.LngLatBounds()
          .extend(coordinates[0])
          .extend(coordinates[coordinates.length - 1]);
        map.fitBounds(bounds, { padding: 50 });
      }
    });

    return () => {
      map.remove();
    };
  }, [places, startingPoint.latitude, startingPoint.longitude]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    places.forEach((place, index) => {
      if (!place.place?.location?.coordinates) return;

      const el = document.createElement("div");
      el.className = "marker";

      const number = document.createElement("span");
      number.className = "marker-text";
      number.textContent = (index + 1).toString();

      const img = document.createElement("img");
      img.src = "/icons/destination.png";
      img.className = "marker-image";

      el.appendChild(number);
      el.appendChild(img);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(place.place.location.coordinates)
        .addTo(map);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<p style="color: black;">${index + 1} : ${place.place.siteLabel}</p>`
      );

      marker.setPopup(popup);
    });
  }, [places]);

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
