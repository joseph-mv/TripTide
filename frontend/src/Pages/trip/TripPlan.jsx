import { useState } from "react";
import { toast } from "react-toastify";
import { BiTransferAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faAnglesLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import { ROUTES } from "../../routes";
import "../../styles/pages/trip/TripPlan.css";
import GeocodedInput from "../../Components/tripPlan/GeocodedInput";
import { currencySymbols, validateDateRange, today } from "../../utils";
import {
  pageVariants1,
  pageVariants2,
  pageTransition,
} from "../../animation/tripPlan";

const vehicleOptions = [
  { value: "", label: "Select..." },
  { value: "bike", label: "Bike" },
  { value: "car", label: "Car" },
  { value: "bus", label: "Bus" },
  { value: "other", label: "Other" },
];
const activities = [
  { name: "sightseeing", label: "Sightseeing" },
  { name: "adventure", label: "Adventure" },
  { name: "shopping", label: "Shopping" },
  { name: "relaxation", label: "Relaxation" },
  { name: "cultural", label: "Cultural" },
  { name: "others", label: "Others" },
];

/**
 * Trip plan page consist of two form for collecting trip details 
 * and store in fromReducer
 */

const TripPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const formData = useSelector((state) => state.form);

  // Reset locationReducer state to initial state while navigating back from the plan-details page.
  dispatch({
    type: "RESET_ LOCATION",
  });

  const handleChange = (e) => {
    dispatch({ type: "UPDATE", payload: e.target });
  };

  //Swap between Destination and Starting Location
  const handleSwap = () => {
    dispatch({
      type: "SWAP_PLACES",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPage === 2) {
      navigate(ROUTES.PLAN_DETAILS);
    }
    const { startDate, endDate } = formData;
    const { success, message } = validateDateRange(startDate, endDate);
    if (!success) {
      toast.error(message);
      return;
    }
    setCurrentPage((pre) => 1 + (pre % 2));
  };

  return (
    <div>
      <div className="trip-planner-form">
        <AnimatePresence mode="wait">
          <form onSubmit={handleSubmit}>
            
            {/* First form */}
            {currentPage === 1 && (
              <motion.div
                className="page"
                key="page1"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants1}
                transition={pageTransition}
              >
                <h2>Plan Your Trip</h2>

                {/* Destination */}
                <div className="form-group">
                  <label htmlFor="destination">Destination:</label>
                  <GeocodedInput
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    handleChange={handleChange}
                    keyEnter={(suggestions,sugIdx)=>dispatch({
                      type: "DESTINATION_SUGGESTION",
                      payload: suggestions[sugIdx].properties,
                    })}
                  />
                </div>

                {/* Swap button */}
                <BiTransferAlt onClick={handleSwap} className="swap-btn" />

                {/* Starting Point */}
                <div className="form-group">
                  <label htmlFor="startingPoint">Starting Location:</label>
                  <GeocodedInput
                    id="startingPoint"
                    name="startingPoint"
                    value={formData.startingPoint}
                    handleChange={handleChange}
                    keyEnter={(suggestions,sugIdx)=>dispatch({
                      type: "STARTING_SUGGESTION",
                      payload: suggestions[sugIdx].properties,
                    })}
                  />
                </div>

                {/* Start Date */}
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    min={today}
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* End Date */}
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    min={today}
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Number of People */}
                <div className="form-group">
                  <label htmlFor="numPeople">Number of People:</label>
                  <input
                    type="number"
                    id="numPeople"
                    name="numPeople"
                    min={1}
                    value={formData.numPeople}
                    onChange={handleChange}
                  />
                </div>

                <button id="nxtBtn" type="submit" className="nxtBtn">
                  Next <FontAwesomeIcon className="icon" icon={faAnglesRight} />
                </button>
              </motion.div>
            )}

            {/* Second form */}
            {currentPage === 2 && (
              <motion.div
                className="page"
                key="page2"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants2}
                transition={pageTransition}
              >
                <h2>Plan Your Trip</h2>

                {/* Budget */}
                <div className="form-group budget">
                  <label htmlFor="budget">Budget:</label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    min={1}
                    value={formData.budget}
                    onChange={handleChange}
                  />

                  <select
                    className="currency"
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    {}
                    {Object.keys(currencySymbols).map((currency) => (
                      <option value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>

                {/* Transportation types */}
                <div className="form-group">
                  <label htmlFor="transportation">Transportation:</label>
                  <select
                    id="transportation"
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleChange}
                    required
                  >
                    {vehicleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Activities */}
                <div className="form-group ">
                  <label>Activities:</label>
                  <div className="activities">
                    {activities.map((activity) => (
                      <div key={activity.name}>
                        <label>
                          <input
                            className="activity"
                            type="checkbox"
                            name={activity.name}
                            checked={formData.activities[activity.name]}
                            onChange={handleChange}
                          />
                          {activity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label htmlFor="notes">Notes:</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="buttons">
                  <button className="prvBtn" onClick={() => setCurrentPage(1)}>
                    <FontAwesomeIcon className="icon" icon={faAnglesLeft} />
                    Previous
                  </button>
                  <button type="submit">
                    Plan Trip
                    <FontAwesomeIcon className="icon" icon={faPaperPlane} />
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TripPlan;
