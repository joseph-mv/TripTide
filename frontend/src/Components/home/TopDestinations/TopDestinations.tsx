import { useEffect, useState } from "react";

import "./TopDestinations.css";
import Destination from "./Destination/Destination";
import { topDestinations } from "../../../services/tripServices";

import { WikiPlace } from "../../../types";


const TopDestinations: React.FC = () => {
  const [destinations, setDestinations] = useState<WikiPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //Fetch top Destinations when loading page
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const places = await topDestinations();
        setDestinations(places);
      } catch (e) {
        console.error("Error fetching top destinations:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <section className="top-destinations">
      <h2 className="top-destinations-heading">Top Destinations</h2>
      {loading && <div className="loader"></div>}

      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <Destination key={index} destination={destination} />
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;
