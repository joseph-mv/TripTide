import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../../styles/pages/trip/Itinerary.css";
import { getItinerary } from "../../services/userService";
import ItineraryForm from "../../Components/ItineraryForm/ItineraryForm";
import { getRouteDestinations } from "../../services/api/destinationServices";
import SelectedLocations from "../../Components/SelectedLocations/SelectedLocations";

/**
 * Edit Itinerary Page
 *
 * Allows users to modify their existing itinerary, selected from the dashboard.
 * Itinerary store in reducers and fetches suggested destinations.
 */
const EditItinerary = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const [trip, setTrip] = useState();

  // get itinerary details and update reducers
  useEffect(() => {
    const get = async () => {

      const response = await getItinerary(tripId);
      dispatch({
        type: "SET_FORM",
        payload: response.details,
      });
      dispatch({
        type: "SET_PLACES",
        payload: response.places.selectedPlaces,
      });
      dispatch({
        type: "SET_STARTING_POINT",
        payload: response.places.startingPoint,
      });
      dispatch({
        type: "SET_DESTINATION",
        payload: response.places.endPoint,
      });
      dispatch({
        type: "DISTANCE",
        payload: response.distance,
      });
      dispatch({
        type: "TRAVELTIME",
        payload: response.travelTime,
      });
      dispatch({
        type: "NOOFDAYS",
        payload: response.noOfDays,
      });
      destinations();
      setTrip(response);
    };
    get();
  }, []);

// get and update destinations along this route
  const destinations = async () => {
    const data = await getRouteDestinations(trip, trip.details.activities);
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
