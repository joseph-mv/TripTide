import React from "react";
import SelectedLocations from "../../Components/SelectedLocations/SelectedLocations";
import ItineraryForm from "../../Components/ItineraryForm/ItineraryForm";
import "../../styles/pages/trip/Itinerary.css";
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
