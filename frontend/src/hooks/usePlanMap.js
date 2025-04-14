import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const usePlanMap = (coordinates) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);

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

  

  return { loading, mapContainerRef, mapRef };
};
