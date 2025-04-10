import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getRectangleCorners } from '../../assets/mapRectangle';


import "./SuggestedLocations.css";
import TouristSpots from "../../destinations/TouristSpots/TouristSpots";
import { getRouteDestinations } from "../../../services/api/destinationServices";
function SuggestedLocations() {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.location);
  const formData = useSelector((state) => state.form);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRouteDestinations(coordinates, formData.activities);
      dispatch({
        type: "ADD_DESTINATIONS",
        payload: data,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: "RESET_ PLACE" }); //reset Selected places,useful while navigate backward

    if (coordinates.destinations.length === 0) {
      //fetch destinations if nothing is here
      setLoading(true);
      if (coordinates.distance) {
        fetchData();
      }
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
          {!loading && coordinates.destinations?.length === 0 && (
            <div className="error">
              {error
                ? "Some network error"
                : "Oops! We couldn't find any destinations that match your chosen activities. Please try selecting different activities or refining your search."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestedLocations;
