import React, { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 *  A card component displaying a top destination, with a flip interaction.
 * @param {Object} props -Component props
 * @param {Object} destination - An object containing information about the destination to be displayed.
 */
const Destination = ({destination}) => {
  const [flipped, setFlipped] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const handleImageLoad = () => {
    setImageLoading(false)
  };

  const handleImageError = () => {
    setImageLoading(false)
  };
  
 // Change the flip state when the card is clicked.
  const handleFlip = () => {
    setFlipped(prev=>!prev);
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
              {imageLoading && <div className="spinner">Loading...</div>}
              <LazyLoadImage
                src={destination.image?.source}
                alt={destination.name}
                className="destination-image"
                effect="blur"
                width="100%"
                height="150px"
                visibleByDefault={true}
                onLoad={handleImageLoad}
                onError={handleImageError}
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
