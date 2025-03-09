import React, { useState } from "react";
import "./UserTrip.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../../DeleteConfirmationModal/DeleteConfirmationModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reverseDate } from "../../../utils/reverseDate";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserTrip = ({ trip, setTrips, current }) => {
  // console.log(trip)
  var token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCloseModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async (e) => {
    e.stopPropagation();

    try {
      const response = await axios.delete(`${BASE_URL}/user/delete-itinerary`, {
        params: { id: trip._id },
        headers: {
          Authorization: token,
        },
      });
      setTrips((trips) => trips.filter((item) => item._id !== trip._id));
      return response;
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setIsModalOpen(false);
    }
  };
  const handleClick = () => {
    navigate("edit-itinerary", { state: { tripId:trip._id } });
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
        trip={trip.name}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </li>
  );
};

export default UserTrip;
