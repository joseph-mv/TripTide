import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./WarningPopup.css";
import {
  calculateDaysBetweenDates,
  convertTimeStringToIntegerHours,
} from "../../../../utils/dateUtils.js";
import { ROUTES } from '../../../../routes.js'

const DAILY_TRAVEL_HOUR = 5;
interface WarningPopupProps {
  travelTime: string;
  startDate: string;
  endDate: string;
}

const WarningPopup: React.FC<WarningPopupProps> = ({ travelTime, startDate, endDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalHours = convertTimeStringToIntegerHours(travelTime);
  const maxTravelDays = calculateDaysBetweenDates(startDate, endDate);
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false); //visibility state of Warning popup

  useEffect(() => {
    dispatch({
      type: "NOOFDAYS",
      payload: maxTravelDays,
    });

    if (totalHours / DAILY_TRAVEL_HOUR > maxTravelDays) {
      setMessage(`Your planned travel time of ${travelTime} exceeds our limit of ${maxTravelDays === 1 ? "one day" : `${maxTravelDays} days`
        }. We recommend traveling 4 to 8 hours per day for a comfortable trip, Happy travels! 🌍✨`);

      setIsVisible(true);
      document.body.classList.add("fixed-body");
    }
  }, [travelTime, maxTravelDays]);

  const closePopup = () => {
    setIsVisible(false);
    document.body.classList.remove("fixed-body");
  };
  const handleChangeDate = () => {
    setIsVisible(false);
    navigate(ROUTES.TRIP_PLAN);
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
