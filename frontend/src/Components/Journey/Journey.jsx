import LocationCard from "../LocationCard/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import "./Jouney.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faMotorcycle,
  faCarSide,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import WarningPopup from "../WarningPopup/WarningPopup";
import { formatDuration } from "../../utils/formatDuration";

const Journey = () => {
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [routeNum, setRouteNum] = useState(0);
  const [routes, setRoutes] = useState([]);
  const formData = useSelector((state) => state.form);
  const coordinates = useSelector((state) => state.location);

 
  function handleRouteChange() {
    dispatch({ type: "RESET_ PLACE" });
    dispatch({ type: "REMOVE_DESTINATIONS" });
    setRouteNum((prev) => (prev + 1) % routes.length);
  }

  const getDirections = async (start, end) => {
    if (start.longitude) {
      // console.log(start)
      const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
      // console.log(accessToken)
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;

      try {
        const response = await axios.get(url);
        const data = response.data;
        // console.log(data);
        setErrMsg("");
        // setData(data)
        setRoutes(data.routes);
        // console.log(data.routes)
      } catch (error) {
        console.error("Error fetching directions:", error);
        let msg = error.response?.data?.message;
        setErrMsg(msg);
      }
    }
  };

  useEffect(() => {
    getDirections(coordinates.startingPoint, coordinates.destination);
  }, [coordinates.startingPoint, coordinates.destination]);
 

  useEffect(() => {
    if (routes.length > 0) {
      let route = routes[routeNum];
      let routeGeometry = route.geometry;
      let length = route.geometry.coordinates.length;
      let distance = (route.distance / 1000).toFixed(2);
      let time = formatDuration(route.duration);
      let coordinates = []; //for pushing the coordinates
      //push points from geometry to coordinates
      for (
        let i = Math.floor(length / 10);
        i < length && length > 10;
        i += Math.floor(length / 10)
      ) {
        coordinates.push(route.geometry.coordinates[i]);
      }
      coordinates.push(route.geometry.coordinates[length - 1]); //push last coordinate

      dispatch({
        type: "ROUTE_GEOMETRY",
        payload: routeGeometry,
      });
      dispatch({
        type: "COORDINATES",
        payload: coordinates,
      });
      
      dispatch({
        type: "DISTANCE",
        payload: distance +" KM",
      });
      
      dispatch({
        type: "TRAVELTIME",
        payload: time,
      });
    }
  }, [routes, routeNum]);

  return (
    <div>
      {coordinates.travelTime && (
        
        <WarningPopup
          travelTime={coordinates.travelTime}
          startDate={formData.startDate}
          endDate={formData.endDate}
        />
      )}{" "}
      <div className="connected-cards">
        <LocationCard name={formData.startingPoint} startingPoint />
        <div className="path">
          <div className="dateDiv">
            <h5>{formData?.startDate.split("-").reverse().join("/")}</h5>
            <h5>{formData?.endDate.split("-").reverse().join("/")}</h5>
          </div>

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
            {coordinates.distance ? (
              <>
                <span>{coordinates.distance}</span> <span>{coordinates.travelTime}</span>
              </>
            ) : (
              <span>{errMsg}</span>
            )}
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

        <LocationCard name={formData.destination} destination />
      </div>
      {/* <Map/> */}
    </div>
  );
};

export default Journey;
