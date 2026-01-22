import { useEffect, useState } from "react";

import './DesSpot.css'
import Heart from "../../ui/Heart";
import LazyImage from "../../ui/LazyImage";
import { getDestDetails } from "../../../services/api/destinationServices";


interface DesSpotProps {
  destination: {
    siteLabel: string;
    typeLabel: string;
    [key: string]: any;
  };
  index: number;
}


function DesSpot({ destination, index }: DesSpotProps) {
  const [details, setDetails] = useState<any>({});
  const [error, setError] = useState<string>("");
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await getDestDetails(destination.siteLabel);
        setDetails(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    getDetails();
  }, []);

  const handleFavorite = () => {
    setLike((prev) => !prev);
  };
  return (
    <div className="destination-card2" data-aos="fade-up">
      {/* Destination name */}
      <h2 className="destination-title">
        <span className="destination-index">{index + 1}.</span>
        {destination.siteLabel}
      </h2>

      {/* Like button */}
      <div onClick={() => handleFavorite()} className="favorite">
        <Heart like={like} />
      </div>

      {/* Destination image */}
      <LazyImage
        imageUrl={details.thumbnail?.source}
        name={destination.siteLabel}
        error={Boolean(error)}
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
