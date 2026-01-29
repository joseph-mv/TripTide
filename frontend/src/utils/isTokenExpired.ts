
import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp! < currentTime;
  } catch (error) {
    console.log(error)
    return true;
  }
};
