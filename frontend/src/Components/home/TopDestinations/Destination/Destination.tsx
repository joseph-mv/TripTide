import React, { useState } from "react";
import LazyImage from "../../../ui/LazyImage";

/**
 *  A card component displaying a top destination, with a flip interaction.
 * @param {Object} props -Component props
 * @param {Object} destination - An object containing information about the destination to be displayed.
 */
const Destination = ({ destination }) => {
  const [flipped, setFlipped] = useState(false);

  // Change the flip state when the card is clicked.
  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };
  return (
    <div data-aos="fade-up">
      <div
        className={`destination-card ${flipped ? "flipped" : ""}`}
        onClick={() => handleFlip()}
      >
        <div className="destination-card-inner">
          {/* Front Side of Card */}
          <div className="destination-card-front">
            <h3 className="destination-name">{destination.name}</h3>
            <div className="image-container">
              <LazyImage
                className="destination-image"
                imageUrl={destination.image?.source}
                name={destination.name}
                height="150px"
              />
              <p className="destination-description">
                {destination.description}
              </p>
            </div>
          </div>

          {/* Back side of card */}
          <div className="destination-card-back">
            <h3 className="destination-name">{destination.name}</h3>
            <p className="destination-details">{destination.extract}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
