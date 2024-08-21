import React, { useState, useEffect } from "react";
import "./WarningPopup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const WarningPopup = ({ travelTime, startDate, endDate }) => {
  // console.log("WarningPopup", travelTime, startDate, endDate);
  const dispatch = useDispatch();
  function calculateDaysBetweenDates(startDate, endDate) {
    // Convert the dates to JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in time (in milliseconds)
    const timeDifference = end - start;

    // Convert the time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference + 1;
  }
  function convertTimeStringToIntegerHours(timeString) {
    // console.log('timest',timeString)
    // Extract hours and minutes from the string
    const [hoursPart, minutesPart] = timeString?.split(" ");
    const hours = parseInt(hoursPart.replace("h", ""), 10);
    const minutes = parseInt(minutesPart.replace("m", ""), 10);

    // Calculate the total hours
    const totalHours = hours + minutes / 60;

    return totalHours;
  }

  const navigate = useNavigate();
  const maxTravelDays = calculateDaysBetweenDates(startDate, endDate);
  const totalHours = convertTimeStringToIntegerHours(travelTime);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  // console.log('travelDays',maxTravelDays,totalHours)
  useEffect(() => {
    if (totalHours / 5 > maxTravelDays) {
      setMessage(`Your planned travel time of ${travelTime} exceeds our limit of ${
        maxTravelDays === 1 ? "one day" : `${maxTravelDays} days`
      }. We recommend traveling 4 to 8 hours per day for a comfortable trip,

Happy travels! 🌍✨`);
      setIsVisible(true);
    }
    dispatch({
      type: "NOOFDAYS",
      payload: maxTravelDays,
    });
  }, [travelTime, maxTravelDays]);

  const closePopup = () => {
    setIsVisible(false);
  };
  const handleChangeDate = () => {
    setIsVisible(false);
    navigate("/trip-plan");
  };

  return (
    isVisible && (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Warning</h2>
          <p>{message}</p>
          <button onClick={closePopup} className="close-button">
            Close
          </button>
          <button onClick={handleChangeDate} className="change-date-button">
            Change Date
          </button>
        </div>
      </div>
    )
  );
};

export default WarningPopup;
