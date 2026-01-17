import Map from "../../Components/planDetails/Map/Map";
import Journey from "../../Components/planDetails/Journey/Journey";
import SuggestedLocations from "../../Components/planDetails/SuggestedLocations/SuggestedLocations";

/**
 * PlanDetails Page.
 *
 * Displays detailed information about a trip, including:
 * - Trip dates ,distance, travel time,etc.
 * - Starting and destination points.
 * - A list of suggested locations based on  points of interest along the route.
 * - An interactive map showing the trip route and selected locations.
 *
*/
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
