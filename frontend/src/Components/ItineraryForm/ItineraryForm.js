// ItineraryForm.jsx
import React, { useState } from "react";
import "./ItineraryForm.css";
import { useSelector } from "react-redux";
import ItineraryToDo from "../ItineraryToDo/ItineraryToDo";
import { getNextDate } from "../../utils/nextDate";
import MapPopup from "../MapPopup/MapPopup";
// index.js or App.js
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { refreshToken } from "../../utils/refreshToken";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ItineraryForm = () => {
  var coordinates = useSelector((state) => state.location);
  // console.log(coordinates)
  var token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_Id");
  var formData = useSelector((state) => state.form);
  const [map, setMap] = useState(false);
  const navigate = useNavigate();
  const currencySymbols = {
    USD: "$", // US Dollar
    EUR: "€", // Euro
    GBP: "£", // British Pound Sterling
    JPY: "¥", // Japanese Yen
    CNY: "¥", // Chinese Yuan
    INR: "₹", // Indian Rupee
    AUD: "$", // Australian Dollar
    CAD: "$", // Canadian Dollar
    CHF: "CHF", // Swiss Franc
    RUB: "₽", // Russian Ruble
    SEK: "kr", // Swedish Krona
    NZD: "$", // New Zealand Dollar
  };

  let date = formData.startDate;
  const newItinerary = {};
  for (let i = 0; i < coordinates.noOfDays; i++) {
    newItinerary["Day" + (i + 1)] = {
      day: i + 1,
      date: date,
      todo: [],
      startingPoint: "",
      endPoint: "",
      notes: "",
    };
    date = getNextDate(date);
  }
  const [itinerary, setItinerary] = useState(newItinerary);
  const [name, setName] = useState("");
  itinerary.Day1.startingPoint = formData.startingPoint;

  // console.table(itinerary)
  const handleItinerary = async (e) => {
    e.preventDefault();
    // console.log((token))
    if (!token) {
      // console.log("No token");
      navigate("/authenticate");
      return;
    } else if (isTokenExpired(token)) {
      // console.log("Token expired");
      token = await refreshToken();
      if (!token) {
        navigate("/authenticate");
      }
    }

    const tripItinerary = {
      userId,
      name,
      itinerary: itinerary,
      places: {
        startingPoint: coordinates.startingPoint,
        endPoint:coordinates.destination,
        selectedPlaces: coordinates.sortedSelectedPlaces,
        
      },
      distance:coordinates.distance,
      travelTime: coordinates.travelTime,
      noOfDays:coordinates.noOfDays,
      details: formData,
      createdAt:new Date()
    };
    // console.log(tripItinerary)
    try {
      const response = await axios.post(
        `${BASE_URL}/user/save-itinerary`,
        tripItinerary,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data) {
        alert("Your Itinerary has been saved");
        navigate("/");
      }
    } catch (error) {
      // console.error(error);
      // setErrorMessage("Deposit failed. Please try again later.");
    }
  };
  return (
    <div className="itineraryDetails">
      <div className="itinerary-details">
        <div className="column">
          <p className="map" onClick={() => setMap(!map)}>
            <strong>Map:</strong>{" "}
            <span role="img" aria-label="map">
              🗺️
            </span>
          </p>
          {map && (
            <MapPopup
              setMap={setMap}
              startingPoint={coordinates.startingPoint}
              places={coordinates.sortedSelectedPlaces}
            />
          )}

          <p>
            <strong>Budget:</strong> {currencySymbols[formData.currency]}{" "}
            {formData.budget}{" "}
          </p>
        </div>

        <div className="column">
          <p>
            <strong>Trippers:</strong> {formData.numPeople}
          </p>
          <p>
            <strong>Transport:</strong> {formData.transportation}
          </p>
        </div>

        <div className="desCard">
          <h3> {formData.destination}</h3>
          <h4>{formData.endDate.split("-").reverse().join("-")}</h4>
        </div>
      </div>
      <hr />
      <h1>MAKE YOUR ITINERARY</h1>
      {Object.keys(itinerary).map((key) => (
        <ItineraryToDo
          day={key}
          item={itinerary[key]}
          setItinerary={setItinerary}
        />
      ))}
      <form onSubmit={handleItinerary} className="saveItinerary">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter itinerary name"
          required
        />

        <button type="submit" className="saveBtn">
          <i className="fa-solid fa-cloud"></i> Save Your Itinerary
        </button>
      </form>
    </div>
  );
};

export default ItineraryForm;
