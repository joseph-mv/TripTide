import { useEffect, useState } from "react";

import './DesSpot.css'
import Heart from "../../ui/Heart";
import LazyImage from "../../ui/LazyImage";
import { getDestDetails } from "../../../services/api/destinationServices";

/**
 * DesSpot component
 * -fetch details of place form wikipedia and shows image and Description
 *
 * @param {object} props -object contain component props
 * @param {object} props.destination -Object contain destination details
 * @param {number} props.index -index of destination in the array.
 */
function DesSpot({ destination, index }) {
  const [details, setDetails] = useState({});
  const [error, setError] = useState("");
  const [like, setLike] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await getDestDetails(destination.siteLabel);
        setDetails(response);
      } catch (error) {
        setError(error.message);
      }
    };

    getDetails();
  }, []);

  const handleFavorite = () => {
    setLike((prev) => !prev);
  };
console.log(details)
  return (
    <div className="destination-card2" data-aos="fade-up">
      {/* Destination name */}
      <h2 className="destination-title">
        <span className="destination-index">{index + 1}.</span>
        {destination.siteLabel}
      </h2>

      {/* Like button */}
      <div onClick={(e) => handleFavorite(destination)} className="favorite">
        <Heart like={like} />
      </div>

      {/* Destination image */}
      <LazyImage
        imageUrl={details.thumbnail?.source}
        name={destination.siteLabel}
        error={error}
      />

      {/* Description */}
      <div className="destination-content">
        <div className="typeLabel">{destination.typeLabel}</div>
        {error && <p className="error">{error}</p>}
        <p className="card-description">{details.extract}</p>
      </div>
    </div>
  );
}

export default DesSpot;
