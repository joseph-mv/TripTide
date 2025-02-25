import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./Account.css"; // Make sure to import your CSS
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import axios from "axios";
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../services/authService";
import {useDispatch} from 'react-redux'
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Account = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const dispatch=useDispatch()
  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    // console.log(name, email);
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
        name,
        email,
        password,
      });
      setLoading(false);
      // console.log(response);
      if (response.data.msg) {
        toast.success(response.data.msg);
        // console.log(response.data.msg);
      } else {
        setError(response.data.error);
      }
      // Handle successful registration, e.g., redirect to login page
    } catch (error) {
      setLoading(false);
      setError("Network issue. Please try again later.");
      // console.error(error);

      // Handle registration error
    }
  };
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginshowPassword, setLoginShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginEmail,loginPassword)
        dispatch({type:"SETUSER",payload:data})
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/"); 
    } catch (error) {
      // Handle login error
      alert(error.message);
    }
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div
      id="container"
      className={classNames("container", {
        "sign-in": isSignIn,
        "sign-up": !isSignIn,
      })}
    >
      {/* FORM SECTION */}
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <form onSubmit={handleSignup}>
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="input-group">
                  <i className="bx bx-mail-send"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setError("");
                      setEmail(e.target.value);
                    }}
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    required
                  />
                  {password && (
                    <button
                      className="showHideBtn"
                      type="button"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      <i
                        className={
                          showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                        }
                      ></i>
                    </button>
                  )}
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    required
                  />
                  {confirmPassword && (
                    <button
                      className="showHideBtn"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <i
                        className={
                          showConfirmPassword
                            ? "fas fa-eye-slash"
                            : "fas fa-eye"
                        }
                      ></i>
                    </button>
                  )}
                </div>
                {{ error } && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                  {loading && <div class="loading"></div>} Sign Up
                </button>
                <p>
                  <span>Already have an account?</span>
                  <b onClick={toggle} className="pointer">
                    Sign in here
                  </b>
                </p>
              </form>
            </div>
          </div>
          <ToastContainer />
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <form onSubmit={handleLogin}>
              <div className="form sign-in">
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type={loginshowPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  {loginPassword && (
                    <button
                      className="showHideBtn"
                      type="button"
                      onClick={() => setLoginShowPassword(!loginshowPassword)}
                    >
                      <i
                        className={
                          loginshowPassword ? "fas fa-eye-slash" : "fas fa-eye"
                        }
                      ></i>
                    </button>
                  )}
                </div>
                <button type="submit">Sign in</button>
                <p>
                  <b className="pointer" onClick={handleForgotPassword}>
                    Forgot password?
                  </b>
                </p>
                <p>
                  <span>Don't have an account?</span>
                  <b onClick={toggle} className="pointer">
                    Sign up here
                  </b>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
  );
};

export default Account;
