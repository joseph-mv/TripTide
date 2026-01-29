import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// @ts-expect-error - no declaration file for @mapbox/mapbox-gl-geocoder
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useRef, useEffect } from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const useDestinationMap = (
  setForm: React.Dispatch<React.SetStateAction<any>>,
  lng: number | null,
  lat: number | null
) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;
    const centerLng = lng ?? 0;
    const centerLat = lat ?? 0;
    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [centerLng, centerLat],
      zoom: 0,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.FullscreenControl(), "bottom-left");
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    if (lng != null && lat != null) {
      setForm((prev: any) => ({
        ...prev,
        coordinates: [lng, lat],
      }));
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      map.setCenter([lng, lat]);
    }

    map.addControl(geocoder, "top-left");
    geocoder.on("result", (event: { result: { place_name: string; geometry: { coordinates: [number, number] } } }) => {
      const placeName = event.result.place_name;
      const coords = event.result.geometry.coordinates;
      setForm((prev: any) => ({
        ...prev,
        place: placeName,
        coordinates: coords,
      }));
    });
    return () => map.remove();
  }, [lng, lat]);

  return { mapContainerRef, mapRef };
};