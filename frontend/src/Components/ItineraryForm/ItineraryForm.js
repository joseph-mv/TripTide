// ItineraryForm.jsx
import React, { useEffect, useState } from "react";
import "./ItineraryForm.css";
import { useDispatch, useSelector } from "react-redux";
import ItineraryToDo from "../ItineraryToDo/ItineraryToDo";
import { getNextDate } from "../../utils/nextDate";
import MapPopup from "../MapPopup/MapPopup";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { refreshToken } from "../../utils/refreshToken";
import { currencySymbols } from "../../utils/currencySymbols";
import { dailyItinerary } from "../../utils/dailyItinerary";
import { getPrevDate } from "../../utils/prevDate";
import { today } from "../../utils/constants";
import { dayAfterNumber } from "../../utils/dayAfternumbers";
import { reverseDate } from "../../utils/reverseDate";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ItineraryForm = ({ oldItinerary, oldName = "", _id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var coordinates = useSelector((state) => state.location);
  var formData = useSelector((state) => state.form);
  var token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_Id");
  const [map, setMap] = useState(false);

  const newItinerary = {};
  const [itinerary, setItinerary] = useState(newItinerary);
  const [name, setName] = useState(oldName);

  //creating new Itinerary object
  useEffect(() => {  
    if (!oldItinerary) {
      let date = formData.startDate;

      for (let i = 0; i < coordinates.noOfDays; i++) {
        console.log("new itinerary");
        newItinerary["Day" + (i + 1)] = dailyItinerary(i, date);
        date = getNextDate(date);
      }
      dispatch({
        type: "CREATE_NEW_ITINERARY",
        payload: { date: date, noOfDays: coordinates.noOfDays },
      });

      // for new Intinerary 1st todo starting location
      itinerary.Day1.startingPoint = formData.startingPoint;
    }
  }, []);
  
  useEffect(() => {
    // for editing oldItinerary from server
    if (oldItinerary) {
      setItinerary(oldItinerary);
    }
  }, [oldItinerary]);


  const addNewDay = () => {
    const number = coordinates.noOfDays;
    const date = getNextDate(formData.endDate);
    const newItinerary = dailyItinerary(number, date);
    dispatch({
      type: "UPDATE",
      payload: { name: "endDate", value: date },
    });
    dispatch({
      type: "INC_NO_OF_DAYS",
    });
    setItinerary((prev) => ({ ...prev, ["Day" + (number + 1)]: newItinerary }));
  };

  const deleteLastDay = () => {
    const number = coordinates.noOfDays;
    const date = getPrevDate(formData.endDate);
    dispatch({ //update the endDate field
      type: "UPDATE",
      payload: { name: "endDate", value: date },
    });
    dispatch({ //decrement the number of days of travelTime
      type: "DEC_NO_OF_DAYS",
    });
//delete last day in itinerary
    setItinerary((prev) => {
      const { ["Day" + number]: _, ...rest } = prev;
      return rest;
    });
  };
  const changeStartDate = (e) => {
    dispatch({ type: "UPDATE", payload: e.target }); //update start date
    const endDate = dayAfterNumber(e.target.value, coordinates.noOfDays);
    dispatch({ type: "UPDATE", payload: { name: "endDate", value: endDate } }); //update end date

    // update all Day dates in itinerary
    const updatedItinerary = { ...itinerary };
    Object.keys(updatedItinerary).forEach((Day)=>{
     const number=Day.match(/\d+/)[0]
     updatedItinerary[Day].date=dayAfterNumber(e.target.value,+number)
    })
    setItinerary(updatedItinerary)
  };

  const handleItinerary = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/authenticate");
      return;
    } else if (isTokenExpired(token)) {
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
        endPoint: coordinates.destination,
        selectedPlaces: coordinates.sortedSelectedPlaces,
      },
      distance: coordinates.distance,
      travelTime: coordinates.travelTime,
      noOfDays: coordinates.noOfDays,
      details: formData,
      createdAt: new Date(),
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/user/${
          _id ? `edit-itinerary?id=${_id}` : "save-itinerary"
        }`,
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
    } catch (error) {}
  };
  return (
    <div className="itineraryDetails">
      
      <label>startDate:</label>
      <input
        type="date"
        name="startDate"
        className="startDateInput"
        value={formData.startDate}
        onChange={changeStartDate}
        min={today}
      />
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
          <h4>{reverseDate.call(formData.endDate)}</h4>
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
      <div>
        <button onClick={addNewDay} className="addDayBtn">
          Add Day
        </button>
        <button onClick={deleteLastDay} className="delDayBtn">
          Delete Day
        </button>
      </div>
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
