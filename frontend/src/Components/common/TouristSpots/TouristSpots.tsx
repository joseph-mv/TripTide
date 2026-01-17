import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./TouristSpots.css";
import LazyImage from "../../ui/LazyImage";
import { haversineDistance } from "../../../utils/haversineDistance";
import { getDestDetails } from "../../../services/api/destinationServices";

/**
 * TouristSpots component
 * Renders details for a single tourist destination
 * 
 * @param {Object} props
 * @param {Object} props.destination - Destination data to display
 * @param {number} props.index - Index of the destination in the list
 * @returns {JSX.Element}
 */
function TouristSpots({ destination, index }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [details, setDetails] = useState("");
  const [expanded, setExpanded] = useState(false);
  const selectedPlaces = useSelector((state) => state.location.selectedPlaces);
  const startingPoint = useSelector((state) => state.location.startingPoint);

  const toggleCard = () => {
    setExpanded(!expanded);
  };
  const handleMouseLeave = () => {
    setExpanded(false);
  };

  //TODO: implement moreDetails button action
  const handleMoreDetailsClick = () => {
    alert("More details clicked");
  };
  const handleCheckboxChange = (event, place, index) => {
    event.stopPropagation(); //prevent event bubbling
    const id = place._id;
    if (selectedPlaces[id]) {
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
        {/* Check box */}
        <label for="checkbox" className="checkbox-label"></label>
        <input
          type="checkbox"
          id="cardCheckbox"
          onChange={(e) => handleCheckboxChange(e, destination, index + 1)}
          onClick={(e) => e.stopPropagation()}
          className="checkbox"
        />

        <div className="index">{index + 1}</div>
        <div className="siteLabel">{destination.siteLabel}</div>
        <div className="typeLabel">{destination.typeLabel}</div>
        <div className="card-content">
          <LazyImage
            imageUrl={details.thumbnail?.source}
            name={destination.siteLabel}
            error={error}
          />

        {/* Description- after clicking card */}
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
