import React from "react";
import Header from "../../Components/Header/Header";
import SelectedLocations from "../../Components/SelectedLocations/SelectedLocations";
import ItineraryForm from "../../Components/ItineraryForm/ItineraryForm";
import "./Itinerary.css";
import SuggestedLocations from "../../Components/SuggestedLocations/SuggestedLocations";
function Itinerary() {
  return (
    <div>
      <Header />
      <div className="itineraryContainer">
        <SelectedLocations />
        <ItineraryForm />
      </div>
     
    </div>
  );
}

export default Itinerary;
