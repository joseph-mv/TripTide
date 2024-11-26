import React, { useState } from 'react';
import './UserTrip.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserTrip = ({ trip,setTrips }) => {
  console.log(trip)
  var token = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate=useNavigate()
    const handleOpenModal = () => {
    
        setIsModalOpen(true);
      };
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      const handleConfirmDelete = async() => {
        try {
          const response = await axios.delete(`${BASE_URL}/user/delete-trip`, {
            params: { id: trip._id },
            headers: {
              Authorization: token,
            },
          });
          setTrips(trips=>trips.filter(item=>item._id!==trip._id))
          return response
        } catch (error) {
          console.error("Error deleting trip:", error);
        }finally{
          setIsModalOpen(false);
        }
        
      };
      const handleClick=()=>{
        navigate("/plan-details/itinerary");
      }
  return (
    <li onClick={handleClick} className="trip-item" key={trip._id}>
      <span className="trip-details">
        {trip.details.startDate.split('-').reverse().join('-')} 
      </span>
      <span className="trip-details">
        {trip.name}
      </span>
    
      <button
        className=" delete-button"
        onClick={() => handleOpenModal(trip)}
      >
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
