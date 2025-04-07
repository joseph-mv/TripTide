import "../../styles/pages/trip/Itinerary.css";
import ItineraryForm from "../../Components/itinerary/ItineraryForm/ItineraryForm";
import SelectedLocations from "../../Components/itinerary/SelectedLocations/SelectedLocations";

/**
 * Itinerary page- for Creating new Itinerary 
 * 
 * Display selected locations , Itinerary form, trip details,etc
 */
function Itinerary() {
  return (
    <div>
      <div className="itineraryContainer">
        <SelectedLocations />
        <ItineraryForm />
      </div>
     
    </div>
  );
}

export default Itinerary;
