import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
 export const fetchDestinations = async (coordinates,activities) => {
  console.log(coordinates)
    try {
      const response = await axios.get(`${BASE_URL}/suggetions`, {
        params: {
          coordinates: coordinates.coordinates,
          distance: coordinates.distance,
          activities: activities,
        },
      });
      return response.data
    } catch (err) {
      throw err
    } 
  };