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
import {
  pageVariants1,
  pageVariants2,
  pageTransition,
} from "../../animation/tripplan";
import { useNavigate } from "react-router-dom";
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const TripPlannerForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  dispatch({
    type: "RESET_ LOCATION",
  });
  //  console.log(coordinates)

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    // console.log(e.target.value)
    dispatch({ type: "UPDATE", payload: e.target });
    setIdxSugg1(0);
    setIdxSugg2(0);
  };
  const handleKeyDown = (e) => {
    // console.log(e.target)
    if (e.key === "ArrowDown") {
      if (e.target.id === "destination") {
        setIdxSugg1((pre) => (pre + 1) % suggestions1.length);
      } else if (e.target.id === "startingPoint") {
        setIdxSugg2((pre) => (pre + 1) % suggestions2.length);
      }
    } else if (e.key === "ArrowUp") {
      if (e.target.id === "destination") {
        setIdxSugg1(
          (pre) => (pre + suggestions1.length - 1) % suggestions1.length
        );
      } else if (e.target.id === "startingPoint") {
        setIdxSugg2(
          (pre) => (pre + suggestions2.length - 1) % suggestions2.length
        );
      }
    } else if (e.key === "Enter") {
      if (e.target.id === "destination" && idxSugg1 >= 0) {
        dispatch({
          type: "DESTINATION_SUGGETION",
          payload: suggestions1[idxSugg1].properties,
        });
        setSuggestions1([]);
        setIdxSugg1(-1);
      } else if (e.target.id === "startingPoint" && idxSugg2 >= 0) {
        dispatch({
          type: "STARTING_SUGGETION",
          payload: suggestions2[idxSugg2].properties,
        });
        setSuggestions2([]);
        setIdxSugg2(-1);
      }
    }
  };

  const [minDate, setMinDate] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [idxSugg1, setIdxSugg1] = useState(-1);

  const [idxSugg2, setIdxSugg2] = useState(-1);
  const fetchGeocodedResults = async (e) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${
          formData[e.target.id]
        }&types=street%2Clocality%2Cplace%2Cregion%2Cdistrict&language=en&access_token=${mapboxToken}`
      );
      // console.log(response)
      if (e.target.id === "destination") {
        setSuggestions1(response.data.features);
      } else {
        setSuggestions2(response.data.features);
      }
    } catch (error) {
      console.error("Error fetching geocoded suggestions:", error);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (currentPage === 2) {
      navigate("/plan-details");
    }
    const { startDate, endDate } = formData;
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be later than end date.");
      e.preventDefault();
      return false;
    }
    e.preventDefault();
    setCurrentPage((pre) => 1 + (pre % 2));
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
                    onKeyDown={handleKeyDown}
                    required
                  />
                  {suggestions1.length > 0 && formData.destination && (
                    <Suggestions
                      suggestions={suggestions1}
                      setSuggestions={setSuggestions1}
                      destination={formData.destination}
                      idx={idxSugg1}
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
                    onKeyDown={handleKeyDown}
                    required
                  />
                  {suggestions2.length > 0 && formData.startingPoint && (
                    <Suggestions
                      suggestions={suggestions2}
                      setSuggestions={setSuggestions2}
                      idx={idxSugg2}
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
                  />
                </div>
                <button id="nxtBtn" type="submit" className="nxtBtn">
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
                    {/* <option value="train">Train</option>
                    <option value="plane">Plane</option> */}
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
