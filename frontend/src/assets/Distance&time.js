
import axios from 'axios';


export const getDirections = async (start, end) => {
    
   const accessToken=process.env.REACT_APP_MAPBOX_TOKEN
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?access_token=${accessToken}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log('Directions Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching directions:', error);
        throw error;
    }
};


