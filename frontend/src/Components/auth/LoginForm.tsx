import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useForm } from "../../hooks/useForm";
import "../../styles/pages/auth/Authentication.css";
import { loginUser } from "../../services/authService";

const initialForm = {
  email: "",
  password: "",
};

interface LoginFormProps {
  toggleAuthView: () => void;
}

/**
 * LoginForm component handles user login with email and password.
 * @param {Object} props - Component props
 * @param {Function} props.toggleAuthView - Function to switch to the sign-up view
 */
const LoginForm: React.FC<LoginFormProps> = ({ toggleAuthView }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const route = location.state || "/"; //go back to previous route or home page
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { form, error, handleChange, handleSubmit, loading } = useForm(
    initialForm,
    async () => {
      const { email, password } = form; // Access current form values
      const data = await loginUser(email, password);
      if (data) {
        dispatch({ type: "SETUSER", payload: data });
        navigate(route, { replace: true }); //  Does'nt go back to login page while click browser's back button
      }
    }
  );
  console.log(form, error)
  const { email, password } = form;

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/forgot-password");
  };
  return (
    <div className="col align-items-center flex-col sign-in">
      <div className="form-wrapper align-items-center">
        <form onSubmit={handleSubmit}>
          <div className="form sign-in">
            {/* Email Input */}
            <div className="input-group">
              <i className="bx bxs-user"></i>
              <input
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
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
                name="password"
                onChange={handleChange}
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
            {error && <p className="error">{error}</p>}

            {/* Submit Button */}
            <button type="submit" disabled={loading}>
              {loading && <div className="loading"></div>} Log in
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
