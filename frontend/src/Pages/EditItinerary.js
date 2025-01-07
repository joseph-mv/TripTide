import { useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import SelectedLocations from "../Components/SelectedLocations/SelectedLocations";
import ItineraryForm from "../Components/ItineraryForm/ItineraryForm";
import "../Pages/Itinerary/Itinerary.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const EditItinerary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { trip } = location.state || {}; // Fallback in case no state is passed
   console.log(trip)
    useEffect(() => {
    dispatch({
        type:"SET_FORM",
    payload: trip.details
      })
    dispatch({
        type: "SET_SORTED",
        payload: trip.places.selectedPlaces,
      });
      dispatch({
        type: "SET_STARTING_POINT",
        payload: trip.places.startingPoint,
      })
      dispatch({
        type:"SET_DESTINATION",
        payload: trip.places.endPoint, 
      })
      dispatch({
        type:"DISTANCE",
        payload: trip.distance, 
      })
      dispatch({
        type:"TRAVELTIME",
        payload: trip.travelTime, 
      })
      dispatch({
        type:"NOOFDAYS",
        payload: trip.noOfDays, 
      })

   }, [])
   
  
  console.log(trip.details)
  return (
    <div>
        <Header/>
        <div className="itineraryContainer">
        <SelectedLocations />
        <ItineraryForm oldItinerary={trip.itinerary} oldName={trip.name} _id={trip._id} />
      </div>
    </div>
  );
};

export default EditItinerary;
