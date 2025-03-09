import { useLocation } from "react-router-dom";
import SelectedLocations from "../../Components/SelectedLocations/SelectedLocations";
import ItineraryForm from "../../Components/ItineraryForm/ItineraryForm";
import "../../styles/pages/trip/Itinerary.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDestinations } from "../../services/api/destinationServices";
import { getItinerary } from "../../services/userService";

const EditItinerary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { tripId } = location.state || {}; // Fallback in case no state is passed
  const [trip, setTrip] = useState();

  const get = async () => {
    const response = await getItinerary(tripId);
    setTrip(response);
  };

  useEffect(() => {
    get();
  }, []);

  // console.log(trip);

  useEffect(() => {
    if (!trip) return;
    dispatch({
      type: "SET_FORM",
      payload: trip.details,
    });
    dispatch({
      type: "SET_PLACES",
      payload: trip.places.selectedPlaces,
    });
    dispatch({
      type: "SET_STARTING_POINT",
      payload: trip.places.startingPoint,
    });
    dispatch({
      type: "SET_DESTINATION",
      payload: trip.places.endPoint,
    });
    dispatch({
      type: "DISTANCE",
      payload: trip.distance,
    });
    dispatch({
      type: "TRAVELTIME",
      payload: trip.travelTime,
    });
    dispatch({
      type: "NOOFDAYS",
      payload: trip.noOfDays,
    });
    // dispatch({
    //   type:"COORDINATES",
    //   payload: trip.coordinates
    // })
    destinations();
  }, [trip]);

  const destinations = async () => {
    const data = await fetchDestinations(trip, trip.details.activities);
    dispatch({
      type: "ADD_DESTINATIONS",
      payload: data,
    });
  };

  return (
    <div>
      <div className="itineraryContainer">
        <SelectedLocations />
        <ItineraryForm
          oldItinerary={trip?.itinerary}
          oldName={trip?.name}
          _id={trip?._id}
        />
      </div>
    </div>
  );
};

export default EditItinerary;
