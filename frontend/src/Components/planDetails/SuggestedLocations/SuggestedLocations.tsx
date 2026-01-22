import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SuggestedLocations.css";
import TouristSpots from "../../common/TouristSpots/TouristSpots";
import { getRouteDestinations } from "../../../services/api/destinationServices";


import { RootState } from "../../../redux/store";
import { Destination } from "../../../types";

function SuggestedLocations() {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formData = useSelector((state: RootState) => state.form);
  const coordinates = useSelector((state: RootState) => state.location);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRouteDestinations({
        coordinates: [(coordinates.startingPoint as any).lng, (coordinates.startingPoint as any).lat],
        distance: parseFloat(coordinates.distance)
      }, Object.keys(formData.activities).filter(key => (formData.activities as any)[key]));
      dispatch({
        type: "ADD_DESTINATIONS",
        payload: data,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: "RESET_ PLACE" });
    if (!coordinates.destinations.length && coordinates.distance) {
      fetchData();
    }
  }, [coordinates.distance]);

  return (
    <div>
      <h1 className="desTitle">Destinations</h1>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="destination-container">
          {coordinates.destinations?.map((destination: Destination, index: number) => (
            <TouristSpots destination={destination} index={index} key={index} />
          ))}
          {error && <div className="error">{error}</div>}
        </div>
      )}
    </div>
  );
}

export default SuggestedLocations;
