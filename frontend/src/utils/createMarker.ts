import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Destination } from "../types";

export const createMarker = (place: Destination, i: number) => {
  const el = document.createElement("div");
  el.className = "marker";

  const number = document.createElement("span");
  number.className = "marker-text";
  number.textContent = (i + 1).toString();
  const img = document.createElement("img");
  img.src = "../../../icons/destination.png";
  img.className = "marker-image";

  el.appendChild(number);
  el.appendChild(img);

  const marker = new mapboxgl.Marker({ element: el }).setLngLat(
    place.location.coordinates
  );

  const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    i + 1 + " : " + place.siteLabel
  );

  marker.setPopup(popup);
  return marker;
};
