import axios from "axios";
import mustVisitPlaces from "../utils/mustVisitPlaces";

export const topDestinations = async () => {
  const randomIndex = Math.floor(Math.random() * (mustVisitPlaces.length - 25));
  const placeToVisit = mustVisitPlaces.slice(randomIndex, randomIndex + 25);
  // Use Promise.all to wait for all the Wikipedia requests to complete
  const places = await Promise.all(
    placeToVisit.map(async (destination, index) => {
      try {
        const wikiResponse = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${destination.name}`
        );
        return {
          name: wikiResponse.data.title,
          description: wikiResponse.data.description,
          extract: wikiResponse.data.extract,
          image: wikiResponse.data.thumbnail,
          coordinates: wikiResponse.data.coordinates,
        };
      } catch (error) {
        console.error(
          `Error fetching Wikipedia summary for index ${index}:`,
          error
        );
        return null;
      }
    })
  );

  return places.filter((place) => place !== null).slice(0, 12);
};

export const getRoutes = async (start, end) => {
    try {
      const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;

      const response = await axios.get(url);
      const data = response.data;
      return data.routes;
    } catch (error) {
      console.error("Error fetching directions:", error);

      throw new Error(error.response?.data?.message);
    } 
};
