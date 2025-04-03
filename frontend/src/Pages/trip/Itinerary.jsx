import "../../styles/pages/trip/Itinerary.css";
import ItineraryForm from "../../Components/ItineraryForm/ItineraryForm";
import SelectedLocations from "../../Components/SelectedLocations/SelectedLocations";

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
