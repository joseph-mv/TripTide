import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faMotorcycle,
  faCarSide,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";

import "./Journey.css";
import LocationCard from "./LocationCard/LocationCard";
import WarningPopup from "./WarningPopup/WarningPopup";
import { reverseDate } from "../../../utils/dateUtils";
import { getRoutes } from "../../../services/tripServices";
import { formatDuration } from "../../../utils/formatDuration";
import { selectRouteGeoCoords } from "../../../utils/tripUtils";

/**
 * Journey component 
 * 
 * fetch routes from mapbox api and save in redux
 * shows starting and destination point with routes details.
 * facility for change routes
 */
const Journey = () => {
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [routeNum, setRouteNum] = useState(0);
  const [routes, setRoutes] = useState([]);
  const formData = useSelector((state) => state.form);
  const trip = useSelector((state) => state.location);

  //Get all routes between starting point and destination.
  useEffect(() => {
    const get = async () => {
      try {
        const response = await getRoutes(trip.startingPoint, trip.destination);
        setRoutes(response);
      } catch (error) {
        setErrMsg(error.message);
      }
    };
    get();
  }, [trip.startingPoint, trip.destination]);

  // select route from routes array based on the routeNum and dispatch it.
  useEffect(() => {
    if (routes.length > 0) {
      const route = routes[routeNum];
      const routeGeometry = route.geometry;
      const distance = (route.distance / 1000).toFixed(2);
      const time = formatDuration(route.duration);
      const coordsAlongRoute = selectRouteGeoCoords(routeGeometry);

      dispatch({
        type: "ROUTE_GEOMETRY",
        payload: routeGeometry,
      });
      dispatch({
        type: "COORDINATES",
        payload: coordsAlongRoute,
      });

      dispatch({
        type: "DISTANCE",
        payload: distance + " KM",
      });

      dispatch({
        type: "TRAVELTIME",
        payload: time,
      });
    }
  }, [routes, routeNum]);

  function handleRouteChange() {
    dispatch({ type: "RESET_ PLACE" });
    dispatch({ type: "REMOVE_DESTINATIONS" });
    setRouteNum((prev) => (prev + 1) % routes.length);
  }

  return (
    <div>
      {/* Warning popup */}
      {trip.travelTime && (
        <WarningPopup
          travelTime={trip.travelTime}
          startDate={formData.startDate}
          endDate={formData.endDate}
        />
      )}
      <div className="connected-cards">
        {/* Starting point card */}
        <LocationCard
          name={formData.startingPoint}
          dispatchType="SET_STARTING_POINT"
        />

        {/* Route details */}
        <div className="path">
          <div className="dateDiv">
            <h5>{reverseDate.call(formData?.startDate)}</h5>
            <h5>{reverseDate.call(formData?.endDate)}</h5>
          </div>
          {/* Moving vehicle */}
          <motion.span
            style={{ width: "100px" }}
            animate={{ x: `1000px`, rotate: [0, -20, 20, 0] }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          >
            <FontAwesomeIcon
              className="vehicleIcon"
              icon={
                formData.transportation === "bike"
                  ? faMotorcycle
                  : formData.transportation === "car"
                  ? faCarSide
                  : faVanShuttle
              }
            />
          </motion.span>

          <h3>
            {trip.distance ? (
              <>
                <span>{trip.distance}</span> <span>{trip.travelTime}</span>
              </>
            ) : (
              <span>{errMsg}</span>
            )}
            {/* Route number and change button */}
            {routes.length > 1 && (
              <div className="route">
                <h3>Route {routeNum + 1}</h3>
                <button onClick={handleRouteChange}>
                  {" "}
                  <FontAwesomeIcon
                    className="routeArrow"
                    icon={faArrowRotateRight}
                  />{" "}
                </button>
              </div>
            )}
          </h3>
        </div>
        {/* Destination card  */}
        <LocationCard
          name={formData.destination}
          dispatchType="SET_DESTINATION"
        />
      </div>
    </div>
  );
};

export default Journey;
