
import LocationCard from "../LocationCard/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import "./Jouney.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faMotorcycle,faCarSide,faVanShuttle, } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import WarningPopup from "../WarningPopup/WarningPopup";


const Journey = () => {


  const [distance, setDistance] = useState()
  const [travelTime, setTravelTime] = useState()
  const [errMsg, setErrMsg] = useState('')
  const [routeNum, setRouteNum] = useState(0)
  const [routes, setRoutes] = useState([])

  const formData = useSelector((state) => state.form);
  const coordinates = useSelector((state) => state.location)
  const dispatch = useDispatch()

  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let result = "";
    if (hours > 0) {
      result += `${hours}h `;
    }
    if (minutes > 0) {
      result += `${minutes}m`;
    }
    return result.trim();
  }
  function handleRouteChange() {
    dispatch({ type: 'RESET_ PLACE' })
    dispatch({ type: 'REMOVE_DESTINATIONS' })
    setRouteNum((prev) => (prev + 1) % routes.length)
  }
  
  useEffect(() => {
    // console.log("journey")
    const getDirections = async (start, end) => {

      if (start.longitude) {
        // console.log(start)
        const accessToken = process.env.REACT_APP_MAPBOX_TOKEN
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;

        try {
          const response = await axios.get(url);
          const data = response.data;
          // console.log(data);
          setErrMsg('')
          // setData(data)
          setRoutes(data.routes)
          // console.log(data.routes)

        } catch (error) {
          console.error('Error fetching directions:', error);
          let msg = error.response?.data?.message
          setErrMsg(msg)
        }
      }


    };

    getDirections(coordinates.startingPoint, coordinates.destination)

  }, [coordinates.startingPoint, coordinates.destination])
  // console.log(routes.length)

  useEffect(() => {
    if (routes.length > 0) {
      let route = routes[routeNum]
      let routeGeometry = route.geometry
      let length = route.geometry.coordinates.length

      let distance = ((route.distance) / 1000).toFixed(2)
      setDistance(distance + ' Km')
      let time = formatDuration(route.duration)
      setTravelTime(time)
      let coordinates = []
      // console.log(length)

      for (let i = Math.floor(length / 10); i < length && length > 10; i += Math.floor(length / 10)) {
        // console.log(i)
        coordinates.push(route.geometry.coordinates[i])
        
      }
      coordinates.push(route.geometry.coordinates[length-1])
      // console.log(coordinates.length)

      dispatch({
        type: 'ROUTE_GEOMETRY',
        payload: routeGeometry
      })
      dispatch({
        type: 'COORDINATES',
        payload: coordinates
      })
      dispatch({
        type: 'DISTANCE',
        payload: distance
      })
    }
  }, [routes, routeNum])


 
  return (
    <div>
    {travelTime &&  <WarningPopup travelTime={travelTime} startDate={formData.startDate} endDate={formData.endDate} />
    }  <div className="connected-cards">
        <LocationCard name={formData.startingPoint} startingPoint />
        <div className="path">
          <div className="dateDiv">
            <h5>{formData?.startDate.split('-').reverse().join('/')}
            </h5>
            <h5>{formData?.endDate.split('-').reverse().join('/')}
            </h5>
              </div >
        
          <motion.span
            style={{ width: '100px' }}
            animate={{ x: `1000px`, rotate: [0, -20, 20, 0] }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          >
            <FontAwesomeIcon className="vehicleIcon" icon={formData.transportation==='bike'?faMotorcycle:formData.transportation==='car'?faCarSide:faVanShuttle} />
          </motion.span>

          <h3>
            {distance ? (
              (
                <>
                  <span>{distance}</span> <span>{travelTime}</span>

                </>
              )

            ) : <span>{errMsg}</span>}
            {routes.length > 1 && <div className="route">
              <h3>Route {routeNum + 1}</h3>
              <button onClick={handleRouteChange} >  <FontAwesomeIcon className="routeArrow" icon={faArrowRotateRight} /> </button>
            </div>}


          </h3>

        </div>


        <LocationCard name={formData.destination} destination />
      </div>

      {/* <Map/> */}
    </div>
  );
};

export default Journey;
