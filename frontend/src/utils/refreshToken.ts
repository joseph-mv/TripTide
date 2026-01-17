import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Function to refresh access token
export const refreshToken = async () => {

  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
    const newAccessToken = response.data.token;
    
    // Update the access token in storage
    localStorage.setItem('token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.log('error',error)
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return null;
  }
};