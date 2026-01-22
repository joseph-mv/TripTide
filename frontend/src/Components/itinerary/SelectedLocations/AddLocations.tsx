import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { RootState } from "../../../redux/store";
import { Destination } from "../../../types";

import TouristSpots from "../../common/TouristSpots/TouristSpots";

interface AddLocationsProps {
  toggleAddLocation: () => void;
}


const AddLocations = ({ toggleAddLocation }: AddLocationsProps) => {
  const coordinates = useSelector((store: RootState) => store.location);
  return (
    <div className="addLocationPopup">
      <div className="addContent">

        {/* Close button */}
        <FontAwesomeIcon
          onClick={toggleAddLocation}
          className="closeBtn"
          icon={faWindowClose as IconProp}
        />

        <h1>Add Destinations</h1>
        <div className="addDestinations">
          {coordinates.destinations.length ===
            Object.keys(coordinates.selectedPlaces).length && (
              <p>No more destinations...</p>
            )}

          {/* Destinations */}
          {coordinates.destinations?.map((destination: Destination, index: number) =>
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
