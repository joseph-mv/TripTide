import axios from "axios";
import { axiosInstance } from "../api";
import { jwtCheck } from "../../utils/authUtils";
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

const NETWORK_ISSUE_MSG = "Network issue. Please try again later."


const BASE_URL = import.meta.env.VITE_BASE_URL;
interface CoordinateParams {
  coordinates: [number, number];
  distance: number;
}

export const getRouteDestinations = async (coordinates: CoordinateParams, activities: string[]) => {
  try {
    await jwtCheck()
    const response = await axios.get(`${BASE_URL}/suggestions`, {
      params: {
        coordinates: coordinates.coordinates,
        distance: coordinates.distance,
        activities: activities,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || NETWORK_ISSUE_MSG)
    }
    throw new Error(NETWORK_ISSUE_MSG)
  }
};

export const getNearbyDestinations = async (form: any) => {
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
    if (error instanceof Error) {
      throw new Error(error.message || NETWORK_ISSUE_MSG);
    }
    throw new Error(NETWORK_ISSUE_MSG);
  }
};

export const getGeocodedSuggestions = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&types=street%2Clocality%2Cplace%2Cregion%2Cdistrict&language=en&access_token=${mapboxToken}`
    );
    return response.data.features;
  } catch (error) {
    console.log("Error fetching geocoded suggestions:", error);
    return [];
  }
};

export const getDestDetails = async (siteLabel: string) => {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${siteLabel}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      ' "Unfortunately, we were unable to locate details for this place."'
    );
  }
};

export const getCoordinatesAndWikiID = async (query: string) => {
  try {
    const response = await getGeocodedSuggestions(query);
    if (!response.length) {
      throw new Error("Place does'nt exist");
    }
    let wikiId = response[0]?.properties?.context?.place?.wikidata_id || "";
    if (!wikiId) {
      wikiId = response[0]?.properties?.context?.region?.wikidata_id || "";
    }
    const coords = response[0]?.properties?.coordinates || {};
    return { coords, wikiId };
  } catch (error) {
    console.log("Error fetching geocoded suggestions:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getDestDescription = async (wikidataId: string) => {
  try {
    const response = await axios.get(
      `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`
    )
    return response.data.entities[wikidataId].descriptions.en.value
  } catch (error) {
    return ''
  }
}

export const getDestImage = async (name: string) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACESSS_KEY;
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${name} landscape&client_id=${accessKey}`
    );
    return (response.data.urls.small);
  } catch (error) {
    console.error(`Error fetching image for ${name}:`, error);
    return '/image/location.png';
  }
}