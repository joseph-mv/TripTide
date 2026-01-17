import { useEffect, useState } from "react";

export const useCurrentLocation=()=>{
   const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
  useEffect(() => {
    //navigator is a property of window object
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
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return {lng,lat}
}