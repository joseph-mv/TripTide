import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SelectedLocations.css";
import Location from "./Location";
import AddLocations from "./AddLocations";
import { reverseDate } from "../../../utils/reverseDate";
import { haversineDistance } from "../../../utils/haversineDistance";
import { RootState } from "../../../redux/store";


const SelectedLocations = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const coordinates = useSelector((state: RootState) => state.location);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const places = coordinates.sortedSelectedPlaces;

  let prevCoord: [number, number] = [
    (coordinates.startingPoint as any).lng || 0,
    (coordinates.startingPoint as any).lat || 0,
  ];

  //sorting selected places by distance from starting point.
  useEffect(() => {
    let selectedPlaces = Object.values(coordinates.selectedPlaces);
    selectedPlaces = selectedPlaces.sort(
      (a, b) => a.distFromStart - b.distFromStart
    );

    dispatch({
      type: "SET_SORTED",
      payload: selectedPlaces,
    });
  }, [coordinates.selectedPlaces]);


  const toggleAddLocation = function () {
    setIsAddingLocation((prev) => !prev);
  };

  return (
    <div className="tourist-spots-list">
      {/* Starting Point */}
      <div className="spot startingPoint">
        <h3 className="site-label">{formData.startingPoint}</h3>
        <h4>{reverseDate.call(formData.startDate)}</h4>
      </div>

      {/* Selected Locations */}
      {places.map((spot, index) => {
        const currCoord = spot.place.location.coordinates;
        const distance = haversineDistance(prevCoord, currCoord) * 1.3;
        prevCoord = currCoord;
        return <Location key={index} distance={distance} spot={spot} index={index} />;
      })}

      {/* Add Button */}
      <FontAwesomeIcon
        onClick={toggleAddLocation}
        className="addButton"
        icon={faPlusCircle}
      />

      {isAddingLocation && (
        <AddLocations toggleAddLocation={toggleAddLocation} />
      )}
    </div>
  );
};

export default SelectedLocations;
