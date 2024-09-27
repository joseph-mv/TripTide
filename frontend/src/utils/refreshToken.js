import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Function to refresh access token
export const refreshToken = async () => {

  const refreshToken = localStorage.getItem('refreshToken');
  const userId=localStorage.getItem('user_Id');

  try {
    const response = await axios.post(`${BASE_URL}/user/refresh-token`, { refreshToken,userId });
    // console.log(response)
    const newAccessToken = response.data.token;
    
    // Update the access token in storage
    localStorage.setItem('token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    
    console.error('Error refreshing token', error);
    return null;
  }
};