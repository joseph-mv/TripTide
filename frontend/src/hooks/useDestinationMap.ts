
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useRef, useEffect } from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";


export const useDestinationMap = (setForm: React.Dispatch<React.SetStateAction<any>>, lng: number | null, lat: number | null) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const mapContainerRef = useRef<HTMLDivElement | null>(null); //html div for map
  const mapRef = useRef<mapboxgl.Map | null>(null);

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
      setForm((prev: any) => ({
        ...prev,
        coordinates: [lng, lat],
      }));
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      map.setCenter([lng, lat]);
    }



    map.addControl(geocoder, "top-left");
    geocoder.on("result", (event: any) => {
      const placeName = event.result.place_name;
      const coordinates = event.result.geometry.coordinates;

      setForm((prev: any) => ({
        ...prev,
        place: placeName,
        coordinates: coordinates,
      }));
    });
    return () => map.remove();
  }, [lng, lat]);

  return { mapContainerRef, mapRef }
}