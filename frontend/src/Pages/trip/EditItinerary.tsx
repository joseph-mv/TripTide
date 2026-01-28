import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../../styles/pages/trip/Itinerary.css";
import { getItinerary } from "../../services/userService";
import ItineraryForm from "../../Components/itinerary/ItineraryForm/ItineraryForm";
import { getRouteDestinations } from "../../services/api/destinationServices";
import SelectedLocations from "../../Components/itinerary/SelectedLocations/SelectedLocations";
import { LocationState, Itinerary, FormDataState } from "../../types";

/**
 * Shape of get-itinerary API response (MongoDB itinerary document).
 */
interface ItineraryResponse {
  _id: string;
  name: string;
  itinerary?: Itinerary;
  details: {
    startDate?: string;
    endDate?: string;
    activities?: FormDataState["activities"];
    [key: string]: unknown;
  };
  places: {
    startingPoint: { latitude: number; longitude: number };
    endPoint: { latitude: number; longitude: number };
    selectedPlaces: Record<string, unknown>;
  };
  distance: string;
  travelTime: string;
  noOfDays: number;
  routeGeometry?: { coordinates: [number, number][] };
  coordinates?: [number, number][];
  [key: string]: unknown;
}

/**
 * Edit Itinerary Page
 *
 * Allows users to modify their existing itinerary, selected from the dashboard.
 * Itinerary store in reducers and fetches suggested destinations.
 */
const EditItinerary = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const [trip, setTrip] = useState<ItineraryResponse | undefined>(undefined);

  useEffect(() => {
    const get = async () => {
      const response = await getItinerary(tripId);
      if (!response || typeof response !== "object" || !("details" in response)) {
        return;
      }
      const res = response as ItineraryResponse;
      dispatch({ type: "SET_FORM", payload: res.details });
      dispatch({ type: "SET_PLACES", payload: res.places.selectedPlaces });
      dispatch({ type: "SET_STARTING_POINT", payload: res.places.startingPoint });
      dispatch({ type: "SET_DESTINATION", payload: res.places.endPoint });
      dispatch({ type: "DISTANCE", payload: res.distance });
      dispatch({ type: "TRAVELTIME", payload: res.travelTime });
      dispatch({ type: "NOOFDAYS", payload: res.noOfDays });

      const coords: LocationState = {
        destination: res.places.endPoint,
        startingPoint: res.places.startingPoint,
        coordinates: res.coordinates ?? res.routeGeometry?.coordinates ?? [],
        distance: res.distance,
        travelTime: res.travelTime,
        routeGeometry: res.routeGeometry?.coordinates ?? [],
        selectedPlaces: (res.places.selectedPlaces as LocationState["selectedPlaces"]) ?? {},
        destinations: [],
        noOfDays: res.noOfDays,
        sortedSelectedPlaces: [],
      };
      const activities = res.details?.activities ?? {
        sightseeing: false,
        adventure: false,
        shopping: false,
        relaxation: false,
        cultural: false,
        others: false,
      };
      try {
        const data = await getRouteDestinations(coords, activities);
        dispatch({ type: "ADD_DESTINATIONS", payload: data });
      } catch (e) {
        console.error("Failed to fetch route destinations:", e);
      }
      setTrip(res);
    };
    get();
  }, [tripId, dispatch]);

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
