import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { LngLatLike } from "mapbox-gl";
import { LocationState } from "../types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const usePlanMap = (coordinates: LocationState) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!coordinates.distance || !container) {
      setLoading(false);
      return;
    }
    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.5, 14],
      zoom: 12,
    });
    map.addControl(new mapboxgl.FullscreenControl());
    mapRef.current = map;

    const start: [number, number] = [
      coordinates.startingPoint.longitude,
      coordinates.startingPoint.latitude,
    ];
    const end: [number, number] = [
      coordinates.destination.longitude,
      coordinates.destination.latitude,
    ];
    const routeGeometry = coordinates.routeGeometry;

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeGeometry.length ? routeGeometry : [start, end],
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

      new mapboxgl.Marker().setLngLat(start as LngLatLike).addTo(map);
      new mapboxgl.Marker().setLngLat(end as LngLatLike).addTo(map);
      const bounds = new mapboxgl.LngLatBounds()
        .extend(start as LngLatLike)
        .extend(end as LngLatLike);
      map.fitBounds(bounds, { padding: 50 });
    });
    setLoading(false);
    return () => map.remove();
  }, [coordinates.distance, coordinates.startingPoint, coordinates.destination, coordinates.routeGeometry]);

  return { loading, mapContainerRef, mapRef };
};
