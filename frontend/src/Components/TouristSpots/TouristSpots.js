import React, { useEffect, useRef, useState } from "react";
import "./TouristSpots.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { haversineDistance } from "../../utils/haversineDistance";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Heart from "../../assets/Heart";

function TouristSpots({ destination, index, locAround }) {
  const selectedPlaces = useSelector((state) => state.location.selectedPlaces);
  const startingPoint = useSelector((state) => state.location.startingPoint);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const handleImageLoad = () => {
    setLoading(false);
  };
  const handleImageError = () => {
    setLoading(false); // Hide the loading spinner even if there's an error
  };
  // console.log(destination)
  const toggleCard = () => {
    setExpanded(!expanded);
  };
  const handleMouseLeave = () => {
    setExpanded(false);
  };
  const handleMoreDetailsClick = () => {
    alert("More details clicked");
  };
  const handleCheckboxChange = (event, place, index) => {
    event.stopPropagation();
    const id = place._id;
    if (selectedPlaces[id]) {
      // delete selectedPlaces[id]
      dispatch({
        type: "DELETE_PLACE",
        payload: id,
      });
    } else {
      const stPoint = [startingPoint.longitude, startingPoint.latitude];
      const destinationPoint = destination.location.coordinates;
      const distFromStart = haversineDistance(stPoint, destinationPoint);

      dispatch({
        type: "ADD_PLACE",
        payload: { place, index, distFromStart },
        id: id,
      });
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${destination.siteLabel}`
      )
      .then((response) => {
        setDescription(response.data);
      })
      .catch((error) => {
        // console.error(error)
        setError(
          "Unfortunately, we were unable to locate details for this place."
        );
      });
    // axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${process.env.REACT_APP_TOMORROW_API}`)
    // .then((response)=>{
    //   console.log(response)
    // })
  }, []);
 

  const handleFavorite = () => {
    setLike((prev) => !prev);
  };

  // use for Find out destination around point
  if (locAround) {
    return (
      <div className="destination-card2" data-aos="fade-up">
        <h2 className="destination-title">
          <span className="destination-index">{index + 1}.</span>
          {destination.siteLabel}
        </h2>
        <div onClick={(e) => handleFavorite(destination)} className="favorite">
          <Heart like={like} />
        </div>
        {loading && !error && description.thumbnail && (
          <div className="spinner">Loading...</div>
        )}

        <LazyLoadImage
          src={description.thumbnail?.source}
          className="card-image"
          width="100%"
          height="auto"
          effect="blur"
          alt={destination.siteLabel}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="destination-content">
          <div className="typeLabel">{destination.typeLabel}</div>
          {error && <p className="error">{error}</p>}
          <p className="card-description">{description.extract}</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        className={`card ${expanded ? "expanded" : ""}`}
        onClick={toggleCard}
        onMouseLeave={handleMouseLeave}
      >
        <input
          type="checkbox"
          id="cardCheckbox"
          onChange={(e) => handleCheckboxChange(e, destination, index + 1)}
          onClick={(e) => e.stopPropagation()}
          className="checkbox"
        />
        <label for="checkbox" className="checkbox-label"></label>
        <div className="index">{index + 1}</div>
        <div className="siteLabel">{destination.siteLabel}</div>
        <div className="typeLabel">{destination.typeLabel}</div>
        <div className="card-content">
          {loading && !error && description.thumbnail && (
            <div className="spinner">Loading...</div>
          )}
          <LazyLoadImage
            src={description.thumbnail?.source}
            className="card-image"
            width="100%"
            height="auto"
            effect="blur"
            alt={destination.siteLabel}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          <p className="card-description">{description.extract}</p>
          {error && <p className="error">{error}</p>}
          <button
            className="more-details-button"
            onClick={handleMoreDetailsClick}
          >
            More Details...
          </button>
        </div>
      </div>
    </div>
  );
}

export default TouristSpots;
