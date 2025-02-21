import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Function to refresh access token
export const refreshToken = async (userId) => {

  const refreshToken = localStorage.getItem('refreshToken');
  // const userId=localStorage.getItem('user_Id');

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