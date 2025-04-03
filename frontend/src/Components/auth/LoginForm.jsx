import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../../styles/pages/auth/Authentication.css";
import { loginUser } from "../../services/authService";

/**
 * LoginForm component handles user login with email and password.
 * @param {Object} props - Component props
 * @param {Function} props.toggleAuthView - Function to switch to the sign-up view
 */
const LoginForm = ({ toggleAuthView }) => {
  const location=useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const route=location.state || '/' //go back to previous route
  console.log(route)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      dispatch({ type: "SETUSER", payload: data });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      setLoading(false);
      navigate(route ,{replace:true});// Redirect to home and does'nt go back to login page
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };
  return (
    <div className="col align-items-center flex-col sign-in">
      <div className="form-wrapper align-items-center">
        <form onSubmit={handleLogin}>
          <div className="form sign-in">

            {/* Email Input */}
            <div className="input-group">
              <i className="bx bxs-user"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <i className="bx bxs-lock-alt"></i>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required
              />
              {password && (
                <button
                  className="showHideBtn"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                  ></i>
                </button>
              )}
            </div>

            {/* Error Message */}
            {{ error } && <p className="error">{error}</p>}

            {/* Submit Button */}
            <button type="submit" disabled={loading}>
              {loading && <div class="loading"></div>} Log in
            </button>

            {/* Forgot Password Link */}
            <p>
              <b className="pointer" onClick={handleForgotPassword}>
                Forgot password?
              </b>
            </p>

            {/* Sign-Up Link */}
            <p>
              <span>Don't have an account?</span>
              <b onClick={toggleAuthView} className="pointer">
                Sign up here
              </b>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
