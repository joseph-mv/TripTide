import React from "react";
import Journey from "../../Components/Journey/Journey";
import SuggestedLocations from "../../Components/SuggestedLocations/SuggestedLocations";
import Map from "../../Components/Map/Map";

function PlanDetails() {
  return (
    <div>
      <Journey />
      <SuggestedLocations />
      <div style={{ height: "90vh" }}></div>
      <Map />
    </div>
  );
}

export default PlanDetails;
