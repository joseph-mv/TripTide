import React, { useEffect, useState } from "react";
import "./TouristSpots.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { haversineDistance } from "../../utils/haversineDistance";

function TouristSpots({ destination, index }) {
  const selectedPlaces = useSelector((state) => state.location.selectedPlaces);
  const startingPoint = useSelector((state) => state.location.startingPoint);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("")

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
    // console.log(place, index,id)
    if (selectedPlaces[id]) {
      // delete selectedPlaces[id]
      dispatch({
        type: "DELETE_PLACE",
        payload: id,
      });
    } else {
      // console.log(startingPoint)
      const stPoint = [startingPoint.longitude, startingPoint.latitude];
      // console.log(destination.location.coordinates)
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
        console.error(error)
        setError("Unfortunately, we were unable to locate details for this place.")
      });
    // axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${process.env.REACT_APP_TOMORROW_API}`)
    // .then((response)=>{
    //   console.log(response)
    // })
  }, []);
  // console.log(description.originalimage?.source)
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
          onClick={e=>e.stopPropagation()}
          className="checkbox"
        />
        <label for="checkbox" className="checkbox-label"></label>
        <div className="index">{index + 1}</div>
        <div className="siteLabel">{destination.siteLabel}</div>
        <div className="typeLabel">{destination.typeLabel}</div>
        <div className="card-content">
          <img src={description.originalimage?.source} className="card-image" />
          <p className="card-description">{description.extract}</p>
          {error && <p>{error}</p>}
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
