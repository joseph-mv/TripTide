import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/pages/auth/ResetPassword.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/forgot-password`,
        { email }
      );
      // console.log(response);
      setLoading(false);
      if (response.data.msg) {
        setOtpSent(true);
        toast.success(response.data.msg);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.error || "Error sending OTP. Please try again."
      );
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < otp.length - 1 && value) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
        {
          email,
          otp: otp.join(""),
          newPassword,
        }
      );
      // console.log(response.data)
      setLoading(false);

      if (response.data.success) {
      toast.success("Password has been reset successfully.");
      setTimeout(()=>navigate("/authenticate"),1500) ;
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.error ||
          "Error resetting password. Please try again."
      );
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <ToastContainer />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {!otpSent ? (
            <form onSubmit={handleEmailSubmit}>
              <h2>Forgot Password</h2>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className="submitBtn" disabled={loading}>
                {loading && <div class="loading"></div>}Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <h2>Enter OTP</h2>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength="1"
                    required
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <h2>Reset Password</h2>
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
                {newPassword && (
                  <button
                    className="showHideButton"
                    type="button"
                    onClick={() => {
                      setShowNewPassword(!showNewPassword);
                    }}
                  >
                    <i
                      className={
                        showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>
                )}
              </div>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
                {confirmPassword && (
                  <button
                    className="showHideButton"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={
                        showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>
                )}
              </div>
              <button className="submitBtn" type="submit" disabled={loading}>
                {loading && <div class="loading"></div>}Reset Password
              </button>
            </form>
          )}
          {error && <p className="error">{error}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
