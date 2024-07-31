import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getRectangleCorners } from '../../assets/mapRectangle';
import axios from "axios";
import './SuggestedLocations.css'

import TouristSpots from "../TouristSpots/TouristSpots";
const BASE_URL = process.env.REACT_APP_BASE_URL;
function SuggestedLocations() {
  const coordinates = useSelector((state) => state.location);
  // console.log(coordinates)
  const dispatch=useDispatch()

 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // console.log('suggest')
    const fetchData = async () => {
      try {
        // console.log("fetching destinations");
        // console.log(coordinates);
        const response = await axios.get(`${BASE_URL}/suggetions`, {
          params: {
            coordinates: coordinates.coordinates,
            distance: coordinates.distance,
          },
        });
        // console.log('suggetions response')
        // console.log(response);
        dispatch({
          type:'ADD_DESTINATIONS',
          payload:response.data

        })
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (coordinates.distance) {
      fetchData();
    }
  }, [coordinates.distance]);
  // console.log(destinations?.length)
 
  return (
    <div>
      <h1 className="desTitle">Destinations</h1>
      {loading? <div class="loader"></div> :''}
      <div className="destination-container" >
      {coordinates.destinations?.map((destination,index)=>(
        <TouristSpots checked={false} destination={destination} index={index}/>
      ))}
      </div>
      
      
    </div>
  );
}

export default SuggestedLocations;
