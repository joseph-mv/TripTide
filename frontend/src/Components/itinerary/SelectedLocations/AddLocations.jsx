import React from "react";
import { useSelector } from "react-redux";
import TouristSpots from "../../destinations/TouristSpots/TouristSpots";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
const AddLocations = ({addLocationPopup}) => {
  const coordinates = useSelector((store) => store.location);

  return (
    <div className="addLocationPopup">
      <div className="addContent">
      <FontAwesomeIcon onClick={addLocationPopup} className="closeBtn" icon={faWindowClose}/>
        <h1>Add Destinations</h1>
        <div className="addDestinations">
          {coordinates.destinations?.map((destination, index) => (
            !coordinates.selectedPlaces[destination._id]?
            <TouristSpots addDestination destination={destination} index={index} />:''
          ))}
        </div>
       
       
      </div>
    </div>
  );
};

export default AddLocations;
