// TouristSpotsList.js
import React, { useEffect, useState } from "react";
import "./SelectedLocations.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { haversineDistance } from "../../utils/haversineDistance";
import { reverseDate } from "../../utils/reverseDate";
import AddLocations from "./AddLocations";

const TouristSpotsList = () => {
  const dispatch = useDispatch();
  var coordinates = useSelector((state) => state.location);
  var formData = useSelector((state) => state.form);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState({});
  const[isAdd, setIsAdd] = useState(false)
  const places = coordinates.sortedSelectedPlaces;
  // console.log(coordinates);
  useEffect(() => {
    var selectedPlaces = Object.values(coordinates.selectedPlaces);
    // console.log(selectedPlaces)
    //sorting selected places by distance from starting point
    selectedPlaces = selectedPlaces.sort(
      (a, b) => a.distFromStart - b.distFromStart
    );

    dispatch({
      type: "SET_SORTED",
      payload: selectedPlaces,
    });
  }, [coordinates.selectedPlaces]);

  //for delete confirmation box
  const handleOpenModal = (spot, index) => {
    setToDelete({ spot: spot, index: index + 1 });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // console.log(places[toDelete.index-1])
    dispatch({
      type: "DELETE_PLACE",
      payload: places[toDelete.index-1].place._id,
    });
    const newPlaces = [
      ...places.slice(0, toDelete.index - 1),
      ...places.slice(toDelete.index),
    ];
    //  console.table(newPlaces)
    dispatch({
      type: "SET_SORTED",
      payload: newPlaces,
    });
    setIsModalOpen(false);
  };

  var firstPoint = [
    coordinates.startingPoint.longitude,
    coordinates.startingPoint.latitude,
  ];
  const addLocationPopup = function () {
    setIsAdd(prev=>!prev)
  };


  return (
    <div className="tourist-spots-list">
      <div className="spot startingPoint">
        <h3 className="site-label">{formData.startingPoint}</h3>
        <h4>{reverseDate.call(formData.startDate)}</h4>
      </div>

      {places.map((spot, index) => {
        var secondPoint = spot.place.location.coordinates;
        var distance = haversineDistance(firstPoint, secondPoint) * 1.3;
        firstPoint = secondPoint;

        return (
          <>
            <div class="icon-container">
              <span class="distance-text">{distance.toFixed(2)} km</span>
              <i class="fa-solid fa-arrow-down-long"></i>
            </div>
            <div className="spot">
              <div className="spot-header">
                <span className="spot-index">{index + 1} </span>

                <button
                  className="delete-button"
                  onClick={() => handleOpenModal(spot, index)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
              <DeleteConfirmationModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
              />
              <div className="spot-body">
                <h3 className="site-label">{spot.place.siteLabel}</h3>
                <p className="type-label">{spot.place.typeLabel}</p>
              </div>
            </div>
          </>
        );
      })}
      <FontAwesomeIcon onClick={addLocationPopup} className="addButton" icon={faPlusCircle} />
    {isAdd && <AddLocations  addLocationPopup={addLocationPopup}/>}
    </div>
  );
};

export default TouristSpotsList;
