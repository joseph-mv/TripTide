import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SuggestedLocations.css";
import TouristSpots from "../../common/TouristSpots/TouristSpots";
import { getRouteDestinations } from "../../../services/api/destinationServices";

/**
 *SuggestedLocations component
 * Fetches and displays suggested destinations
 */
function SuggestedLocations() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const formData = useSelector((state) => state.form);
  const coordinates = useSelector((state) => state.location);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRouteDestinations(coordinates, formData.activities);
      dispatch({
        type: "ADD_DESTINATIONS",
        payload: data,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: "RESET_ PLACE" }); 
    if (!coordinates.destinations.length && coordinates.distance) {
      fetchData();
    }
  }, [coordinates.distance]);

  return (
    <div>
      <h1 className="desTitle">Destinations</h1>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="destination-container">
          {coordinates.destinations?.map((destination, index) => (
            <TouristSpots destination={destination} index={index} />
          ))}
          {error && <div className="error">{error}</div>}
        </div>
      )}
    </div>
  );
}

export default SuggestedLocations;
