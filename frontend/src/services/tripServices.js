import axios from "axios";
import mustVisitPlaces from "../utils/mustVisitPlaces";

export const topDestinations=async()=>{
    const randomIndex = Math.floor(
        Math.random() * (mustVisitPlaces.length - 25)
      );
      const placeToVisit = mustVisitPlaces.slice(
        randomIndex,
        randomIndex + 25
      );
 // Use Promise.all to wait for all the Wikipedia requests to complete
      const places =  await Promise.all(
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

      return places.filter((place)=>place!==null).slice(0,12)
}