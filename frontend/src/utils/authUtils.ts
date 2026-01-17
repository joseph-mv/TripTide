import { refreshToken } from "./refreshToken";
import { isTokenExpired } from "./isTokenExpired";


export const jwtCheck = async() => {
  let token=localStorage.getItem('token')
  if (isTokenExpired(token)) {
    token = refreshToken();
  }
};
