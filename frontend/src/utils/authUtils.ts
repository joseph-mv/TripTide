import { refreshToken } from "../services/authService";
import { isTokenExpired } from "./isTokenExpired";


export const jwtCheck = async () => {
  let token = localStorage.getItem('token')
  if (isTokenExpired(token)) {
    token = await refreshToken();
  }
};
