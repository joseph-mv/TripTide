
import LocationCard from "../LocationCard/LocationCard";
import { useDispatch, useSelector } from "react-redux";
import "./Jouney.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
// import Map from "../Map/Map";
import { useEffect, useState } from "react";
import axios from 'axios';
const Journey = () => {
const [data, setData] = useState({})
const [distance,setDistance]=useState()
const [duration,setDuration]=useState()
const [errMsg,setErrMsg]=useState('')
const navigate=useNavigate()
  const formData = useSelector((state) => state.form);
  const coordinates=useSelector((state)=>state.location)
  const dispatch=useDispatch()

  if(!coordinates.startingPoint.latitude){
    navigate('/trip-plan')
  }
  
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

   useEffect(() => {
    
    const getDirections = async (start, end) => {
      if(start.longitude){
        // console.log(start)
        const accessToken=process.env.REACT_APP_MAPBOX_TOKEN
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;
    
        try {
            const response = await axios.get(url);
            const data = response.data;
            setErrMsg('')
            setData(data)
            // console.log(data)
            let route=data.routes[0]
            let length=route.geometry.coordinates.length
            // console.log(length+' len')
            // let midCoordinate=route.geometry.coordinates[Math.floor(length/2)]
            // let midCoordinateObj={longitude:midCoordinate[0],latitude:midCoordinate[1]}
            // console.log(midCoordinateObj)
            // dispatch({
            //   type:'MID_POINT',
            //   payload:midCoordinateObj
            // })
            // console.log(midCoordinate)
            let distance=((route.distance)/1000).toFixed(2)
            setDistance(distance+' Km')
            let time=formatDuration(route.duration)
            setDuration(time)
            let coordinates=[]
            
            for (let i=Math.floor(length/10);i<length;i+=Math.floor(length/10)){
              // console.log('i:'+i)
              coordinates.push(route.geometry.coordinates[i])
            }
            // console.log(coordinates)
            dispatch({
              type:'COORDINATES',
              payload:coordinates
            })
            dispatch({
              type:'DISTANCE',
              payload:distance
            })
            
    
        } catch (error){
            console.error('Error fetching directions:', error);
           let msg=error.response?.data?.message
           setErrMsg(msg)
        }
      }
      
      
    };

   getDirections(coordinates.startingPoint,coordinates.destination)
  
  }, [coordinates.startingPoint,coordinates.destination])
   
    // console.log(coordinates)
   return (
    <div>
      <div className="connected-cards">
        <LocationCard name={formData.startingPoint} startingPoint/>
        <div className="path">
          <motion.span
          style={{width:'100px'}}
            animate={{ x:`1000px`, rotate: [0, -20, 20, 0] }}
            transition={{ duration:10 , ease: "linear", repeat: Infinity }}
          >
            <FontAwesomeIcon className="vehicleIcon" icon={faMotorcycle} />
          </motion.span>
          <h3>
            {distance ? (
              (
                <>
                    <span>{distance}</span> <span>{duration}</span>
                </>
            )
                
            ) :<span>{errMsg}</span> }
        </h3>
           </div>

        <LocationCard name={formData.destination} destination/>
      </div>

      {/* <Map/> */}
    </div>
  );
};

export default Journey;
