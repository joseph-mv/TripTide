import axios from "axios";
import { axiosInstance } from "../api";
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getRouteDestinations = async (coordinates, activities) => {
  console.log(activities);
  try {
    const response = await axios.get(`${BASE_URL}/suggestions`, {
      params: {
        coordinates: coordinates.coordinates,
        distance: coordinates.distance,
        activities: activities,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getNearbyDestinations = async (form) => {
  try {
    if (!form.coordinates.length) {
      throw new Error("Please select a place");
    }

    const response = await axiosInstance.get("/destinations", { params: form });
    if (!response.data.length) {
      throw new Error(
        "We couldn't find any locations that match your criteria. Please try adjusting your destination or explore different options."
      );
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Network issue. Please try again later.");
  }
};

export const getGeocodedSuggestions = async (query) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&types=street%2Clocality%2Cplace%2Cregion%2Cdistrict&language=en&access_token=${mapboxToken}`
    );
    return response.data.features;
  } catch (error) {
    console.error("Error fetching geocoded suggestions:", error);
    return [];
  }
};
