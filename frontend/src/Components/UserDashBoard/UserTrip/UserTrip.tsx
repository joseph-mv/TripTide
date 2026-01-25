import React, { useState } from "react";
import "./UserTrip.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../../common/DeleteConfirmationModal/DeleteConfirmationModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reverseDate } from "../../../utils/reverseDate";
import { ROUTES } from "../../../routes";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { Trip } from "../../../types";

interface UserTripProps {
  trip: Trip;
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
  current?: boolean;
}


const UserTrip = ({ trip, setTrips, current }: UserTripProps) => {
  // console.log(trip)
  var token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const response = await axios.delete(`${BASE_URL}/user/delete-itinerary`, {
        params: { id: trip._id },
        headers: {
          Authorization: token,
        },
      });
      setTrips((prev) => prev.filter((item) => item._id !== trip._id));
      return response;
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setIsModalOpen(false);
    }
  };
  const handleClick = () => {
    navigate(ROUTES.EDIT_ITINERARY+'/'+trip._id, { state: { tripId:trip._id } });
  };
  return (
    <li onClick={handleClick} className="trip-item" key={trip._id}>
      {current ? (
        <button className="editBtn" onClick={handleClick}>Edit</button>
      ) : (
        <>
          {" "}
          <span className="trip-details">
            {reverseDate.call(trip.details.startDate)}
          </span>
          <span className="trip-details">{trip.name}</span>{" "}
        </>
      )}

      <button className=" delete-button" onClick={handleOpenModal}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      <DeleteConfirmationModal
        content={trip.name}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </li>
  );
};

export default UserTrip;
