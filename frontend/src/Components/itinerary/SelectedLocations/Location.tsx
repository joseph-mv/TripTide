import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SelectedLocations.css";
import DeleteConfirmationModal from "../../common/DeleteConfirmationModal/DeleteConfirmationModal";
import { RootState } from "../../../redux/store";
import { SelectedPlace } from "../../../types";

interface LocationProps {
  distance: number;
  index: number;
  spot: SelectedPlace;
}

const Location = ({ distance, index, spot }: LocationProps) => {
  const dispatch = useDispatch();
  var coordinates = useSelector((state: RootState) => state.location);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(-1);
  const places = coordinates.sortedSelectedPlaces;

  const handleOpenModal = (index: number) => {
    setDeletingIndex(index);
    setIsDeleteModelOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModelOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch({
      type: "DELETE_PLACE",
      payload: places[deletingIndex].place._id,
    });
    setIsDeleteModelOpen(false);
  };

  return (
    <>
      {/* Distance to Location */}
      <div className="icon-container">
        <span className="distance-text">{distance.toFixed(2)} km</span>
        <i className="fa-solid fa-arrow-down-long"></i>
      </div>
      {/* Location Details */}
      <div className="spot">
        <div className="spot-header">
          <span className="spot-index">{index + 1} </span>
          <button
            className="delete-button"
            onClick={() => handleOpenModal(index)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <div className="spot-body">
          <h3 className="site-label">{spot.place.siteLabel}</h3>
          <p className="type-label">{spot.place.typeLabel}</p>
        </div>
      </div>

      <DeleteConfirmationModal
        content={`Are you sure you want to delete ${spot.place.siteLabel} destination?`}
        isOpen={isDeleteModelOpen}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default Location;
