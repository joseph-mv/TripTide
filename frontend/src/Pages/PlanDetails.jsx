import React from "react";
import Header from "../Components/Header/Header";
import Journey from "../Components/Journey/Journey";
import SuggestedLocations from "../Components/SuggestedLocations/SuggestedLocations";
import Map from "../Components/Map/Map";
import Footer from "../Components/Footer/Footer";

function PlanDetails() {
  return (
    <div>
      <Header />
      <Journey />
      <SuggestedLocations />
      <div style={{ height: "90vh" }}></div>
      <Map />
      <Footer />
    </div>
  );
}

export default PlanDetails;
