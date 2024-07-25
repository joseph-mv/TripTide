import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { getRectangleCorners } from '../../assets/mapRectangle';
import axios from 'axios';
import { distance } from 'framer-motion';
function SuggestedLocations() {
    const coordinates=useSelector((state)=>state.location)
    // console.log(coordinates)
    const [points,setPoints]=useState([])
     
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      useEffect(() => {
        const fetchData = async () => {
          try {
            console.log('fetching data')
            console.log(coordinates)
            const response = await axios.get('http://localhost:5000/suggetions',{params:{coordinates:coordinates.coordinates,distance:coordinates.distance}});
            console.log(response)
            setData(response.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    if(coordinates.distance){
      fetchData();
    }
       
      
      
       
      }, [coordinates.distance])
      


      
     
  return (
    <div>
      
    </div>
  )
}


export default SuggestedLocations
