import { refreshToken } from "./refreshToken";
import { isTokenExpired } from "./isTokenExpired";


export const jwtCheck = async(token) => {
    console.log('jwtCheck')
  if (isTokenExpired(token)) {
    token = refreshToken();
  }
};
