import { useEffect } from "react";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";

import { refreshToken } from "../../utils/refreshToken";
import { isTokenExpired } from "../../utils/isTokenExpired";



/**
 * **ProtectedRoute Component**
 * - Restricts access to authenticated users.
 * - If `isAuthenticated`, renders the protected content (`children`).
 * - Otherwise, redirects users to the authentication page.
*/
const ProtectedRoute = () => {
    const location=useLocation()
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

   useEffect(() => {
    if (!token) {
        navigate("/authenticate", {state:location.pathname});
        return;
    } else if (isTokenExpired(token)) {   
        token = refreshToken();
        if (!token) navigate("/authenticate", {state:location.pathname});
      }
   }, [])
    
return <Outlet/>
};

export default ProtectedRoute;