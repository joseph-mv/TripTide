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
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ItineraryForm = ({ oldItinerary, oldName = "", _id }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  var coordinates = useSelector((state) => state.location);
  var formData = useSelector((state) => state.form);
  var token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_Id");
  const [map, setMap] = useState(false);

  const newItinerary = {};
  
  if (!oldItinerary) {
    let date = formData.startDate;

    for (let i = 0; i < coordinates.noOfDays; i++) {
      newItinerary["Day" + (i + 1)] = dailyItinerary(i, date);
      date = getNextDate(date);
    }
    dispatch({
      type:"CREATE_NEW_ITINERARY",
      payload:{date:date,noOfDays:coordinates.noOfDays}

    })
  }
  
  
 
  const [itinerary, setItinerary] = useState(()=>{
    const savedItinerary =localStorage.getItem("itinerary"); 
    return savedItinerary?JSON.parse(savedItinerary):newItinerary
  });

useEffect(() => {
 localStorage.setItem("itinerary", JSON.stringify(itinerary))
 return () => {
 localStorage.removeItem('itinerary')
}
}, [itinerary])




  useEffect(() => {
    // for editing itinerary
    if (oldItinerary) {
      setItinerary( oldItinerary);
    }
  }, [oldItinerary]);

  const [name, setName] = useState(oldName);

  if (!oldItinerary) {
    // for new Intinerary
    itinerary.Day1.startingPoint = formData.startingPoint;
  }

  const addNewDay = () => {
    const number=coordinates.noOfDays
    const date=getNextDate(formData.endDate)
    const newItinerary = dailyItinerary( number, date);
    dispatch({
      type:"UPDATE",
      payload:{name:"endDate",value:date}
    })
    dispatch({
      type:"INC_NO_OF_DAYS"
    })
    setItinerary(prev=>({...prev, ["Day" + (number+1)]:newItinerary}));
    
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
      <button onClick={addNewDay} className="addDayBtn">Add Day</button>
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
