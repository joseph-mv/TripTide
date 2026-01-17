import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

import TouristSpots from "../../common/TouristSpots/TouristSpots";

/**
 * Component to render the AddLocations popup/modal.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.toggleAddLocation - Function to handle opening/closing popup (toggle logic).
  * @returns {JSX.Element} AddLocations component.
 */
const AddLocations = ({ toggleAddLocation }) => {
  const coordinates = useSelector((store) => store.location);
  return (
    <div className="addLocationPopup">
      <div className="addContent">

        {/* Close button */}
        <FontAwesomeIcon
          onClick={toggleAddLocation}
          className="closeBtn"
          icon={faWindowClose}
        />

        <h1>Add Destinations</h1>
        <div className="addDestinations">
          {coordinates.destinations.length ===
            Object.keys(coordinates.selectedPlaces).length && (
            <p>No more destinations...</p>
          )}

          {/* Destinations */}
          {coordinates.destinations?.map((destination, index) =>
            !coordinates.selectedPlaces[destination._id] ? (
              <TouristSpots
                addDestination
                destination={destination}
                index={index}
              />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLocations;
