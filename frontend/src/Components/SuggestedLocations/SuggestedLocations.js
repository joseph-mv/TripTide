import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getRectangleCorners } from '../../assets/mapRectangle';
import axios from "axios";
import "./SuggestedLocations.css";

import TouristSpots from "../TouristSpots/TouristSpots";
const BASE_URL = process.env.REACT_APP_BASE_URL;
function SuggestedLocations() {
  const coordinates = useSelector((state) => state.location);
  const formData = useSelector((state) => state.form);
  // console.log('form',formData.activities)
  const dispatch = useDispatch();

  // console.log(coordinates)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // console.log(loading)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("fetching destinations");
        // console.log(coordinates.coordinates);
        const response = await axios.get(`${BASE_URL}/suggetions`, {
          params: {
            coordinates: coordinates.coordinates,
            distance: coordinates.distance,
            activities: formData.activities,
          },
        });
        // console.log('suggetions response')
        // console.log(response);
        dispatch({
          type: "ADD_DESTINATIONS",
          payload: response.data,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    dispatch({ type: "RESET_ PLACE" });
    if (coordinates.destinations.length === 0) {
      setLoading(true);
      if (coordinates.distance) {
        fetchData();
      }
    }
  }, [coordinates.distance]);

  //  console.log('len',coordinates.destinations)
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
          {!loading && coordinates.destinations?.length === 0 && (
            <div className="error">
              "Oops! We couldn't find any destinations that match your chosen
              activities. Please try selecting different activities or refining
              your search."
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestedLocations;
