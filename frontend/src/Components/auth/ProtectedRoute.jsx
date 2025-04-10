import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { refreshToken } from "../../utils/refreshToken";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { useDispatch } from "react-redux";

/**
 * **ProtectedRoute Component**
 * - Restricts access to authenticated users.
 * - If `isAuthenticated`, renders the protected content (`children`).
 * - Otherwise, redirects users to the authentication page.
 */
const ProtectedRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  
  useEffect(() => {
   const authCheck=async()=>{
    if (!token) {
        navigate("/authenticate", { state: location.pathname });
        return;
      } else if (isTokenExpired(token)) {
        token = await refreshToken();
        if (!token) {
          dispatch({ type: "REMOVEUSER" });
          navigate("/authenticate", { state: location.pathname });
        }
      }
   }
   authCheck()
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
