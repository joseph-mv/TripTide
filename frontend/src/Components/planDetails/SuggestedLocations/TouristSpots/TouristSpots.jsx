import React, { useEffect, useState } from "react";
import "./TouristSpots.css";

import { useDispatch, useSelector } from "react-redux";
import { haversineDistance } from "../../../utils/haversineDistance";

import { getDestDetails } from "../../../services/api/destinationServices";
import LazyImage from "../../ui/LazyImage";

function TouristSpots({ destination, index }) {
  const selectedPlaces = useSelector((state) => state.location.selectedPlaces);
  const startingPoint = useSelector((state) => state.location.startingPoint);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  // console.log(destination)
  const toggleCard = () => {
    setExpanded(!expanded);
  };
  const handleMouseLeave = () => {
    setExpanded(false);
  };
  const handleMoreDetailsClick = () => {
    alert("More details clicked");
  };
  const handleCheckboxChange = (event, place, index) => {
    event.stopPropagation();
    const id = place._id;
    if (selectedPlaces[id]) {
      // delete selectedPlaces[id]
      dispatch({
        type: "DELETE_PLACE",
        payload: id,
      });
    } else {
      const stPoint = [startingPoint.longitude, startingPoint.latitude];
      const destinationPoint = destination.location.coordinates;
      const distFromStart = haversineDistance(stPoint, destinationPoint);

      dispatch({
        type: "ADD_PLACE",
        payload: { place, index, distFromStart },
        id: id,
      });
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await getDestDetails(destination.siteLabel);
        setDetails(response);
      } catch (error) {
        setError(error.message);
      }
    };

    getDetails();
  }, []);

  return (
    <div>
      <div
        className={`card ${expanded ? "expanded" : ""}`}
        onClick={toggleCard}
        onMouseLeave={handleMouseLeave}
      >
        <input
          type="checkbox"
          id="cardCheckbox"
          onChange={(e) => handleCheckboxChange(e, destination, index + 1)}
          onClick={(e) => e.stopPropagation()}
          className="checkbox"
        />
        <label for="checkbox" className="checkbox-label"></label>
        <div className="index">{index + 1}</div>
        <div className="siteLabel">{destination.siteLabel}</div>
        <div className="typeLabel">{destination.typeLabel}</div>
        <div className="card-content">
          <LazyImage
            imageUrl={details.thumbnail?.source}
            name={destination.siteLabel}
            error={error}
          />

          <p className="card-description">{details.extract}</p>
          {error && <p className="error">{error}</p>}
          <button
            className="more-details-button"
            onClick={handleMoreDetailsClick}
          >
            More Details...
          </button>
        </div>
      </div>
    </div>
  );
}

export default TouristSpots;
