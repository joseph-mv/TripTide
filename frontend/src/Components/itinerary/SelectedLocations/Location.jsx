import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SelectedLocations.css";
import DeleteConfirmationModal from "../../common/DeleteConfirmationModal/DeleteConfirmationModal";

/**
 * Renders a location component with distance info and spot details.
 *
 * @param {Object} props - Component props.
 * @param {number} props.distance - Distance to the location.
 * @param {number} props.index - Index of the location in the list.
 * @param {Object} props.spot - Spot data object containing details of the location.
 * @returns {JSX.Element} Rendered Location component.
 */
const Location = ({ distance, index, spot }) => {
  const dispatch = useDispatch();
  var coordinates = useSelector((state) => state.location);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(-1);
  const places = coordinates.sortedSelectedPlaces;

  const handleOpenModal = (index) => {
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
