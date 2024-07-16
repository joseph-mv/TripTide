import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./TripPlannerForm.css";

import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faAnglesLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Suggestions from "../../assets/Suggetions/Suggestions";
import { pageVariants1,pageVariants2,pageTransition } from "../../animation/tripplan";
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const TripPlannerForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    dispatch({ type: "UPDATE", payload: e.target });
  };
  const validateForm = (e) => {
    // console.log(formData)
    const { destination, startingPoint, startDate, endDate, numPeople } =
      formData;
    if (
      !destination ||
      !startingPoint ||
      !startDate ||
      !endDate ||
      !numPeople
    ) {
      //   alert('Please fill out all fields.');
      return false;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be later than end date.");
      e.preventDefault();
      return false;
    }
    if (numPeople < 1) {
      return false;
    }
    return true;
  };

  
  const [minDate, setMinDate] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);

  const fetchGeocodedResults = async (e) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${
          formData[e.target.id]
        }&access_token=${mapboxToken}`
      );
      // console.log(response)
      if (e.target.id === "destination") {
        setSuggestions1(response.data.features);
      } else {
        setSuggestions2(response.data.features);
      }
    } catch (error) {
      console.error("Error fetching geocoded suggestions:");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(formData);
    // Handle form submission logic here
  };

  useEffect(() => {
    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  return (
    <div>
      <div className="trip-planner-form">
        <AnimatePresence mode="wait">
          <form onSubmit={handleSubmit}>
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
                <div className="form-group">
                  <label htmlFor="destination">Destination:</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={(e) => {
                      fetchGeocodedResults(e);
                      handleChange(e);
                    }}
                    required
                  />
                  {suggestions1.length > 0 && formData.destination && (
                    <Suggestions
                      suggestions={suggestions1}
                      setSuggestions={setSuggestions1}
                      place={formData.destination}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="startingPoint">Starting Location:</label>
                  <input
                    type="text"
                    id="startingPoint"
                    name="startingPoint"
                    value={formData.startingPoint}
                    onChange={(e) => {
                      fetchGeocodedResults(e);
                      handleChange(e);
                    }}
                    required
                  />
                  {suggestions2.length > 0 && formData.startingPoint && (
                    <Suggestions
                      suggestions={suggestions2}
                      setSuggestions={setSuggestions2}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    min={minDate}
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    min={minDate}
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numPeople">Number of People:</label>
                  <input
                    type="number"
                    id="numPeople"
                    name="numPeople"
                    min={1}
                    value={formData.numPeople}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  className="nxtBtn"
                  onClick={(e) => {
                    // e.preventDefault()
                    if (validateForm(e)) {
                      setCurrentPage(2);
                    }
                  }}
                >
                  Next <FontAwesomeIcon className="icon" icon={faAnglesRight} />
                </button>
              </motion.div>
            )}
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
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>

                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                    <option value="CHF">CHF</option>
                    <option value="CNY">CNY</option>
                    <option value="SEK">SEK</option>
                    <option value="NZD">NZD</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="transportation">Transportation:</label>
                  <select
                    id="transportation"
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                    <option value="plane">Plane</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group ">
                  <label>Activities:</label>
                  <div className="activities">
                    <div>
                      <label>
                        <input
                          className="activity"
                          type="checkbox"
                          name="sightseeing"
                          checked={formData.activities.sightseeing}
                          onChange={handleChange}
                        />
                        Sightseeing
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          className="activity"
                          type="checkbox"
                          name="adventure"
                          checked={formData.activities.adventure}
                          onChange={handleChange}
                        />
                        Adventure
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          className="activity"
                          type="checkbox"
                          name="shopping"
                          checked={formData.activities.shopping}
                          onChange={handleChange}
                        />
                        Shopping
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          className="activity"
                          type="checkbox"
                          name="dining"
                          checked={formData.activities.dining}
                          onChange={handleChange}
                        />
                        Dining
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          className="activity"
                          type="checkbox"
                          name="relaxation"
                          checked={formData.activities.relaxation}
                          onChange={handleChange}
                        />
                        Relaxation
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          className="activity"
                          type="checkbox"
                          name="cultural"
                          checked={formData.activities.cultural}
                          onChange={handleChange}
                        />
                        Cultural
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          className="activity"
                          type="checkbox"
                          name="others"
                          checked={formData.activities.others}
                          onChange={handleChange}
                        />
                        Others
                      </label>
                    </div>
                  </div>
                </div>
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

export default TripPlannerForm;
