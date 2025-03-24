import React, { useState } from "react";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../../styles/pages/auth/ResetPassword.css";
import { forgotPassword } from "../../services/authService";
/**
 * **EmailForm Component**
 * - Handles sending OTP to the user's email for password reset.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setOtpSent - Function to update OTP sent status.
 * @param {Function} props.setError - Function to update error messages.
 * @param {string} props.email - The user's email.
 * @param {Function} props.setEmail - Function to update email state.
 */
const EmailForm = ({ setOtpSent, setError, email, setEmail }) => {
  const [loading, setLoading] = useState(false);

  /**
   * Handles the email submission to send an OTP.
   */
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      toast.success(response);
      setOtpSent(true);
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.message || "Error sending OTP. Please try again.");
    }
  };

  return (
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
        {loading && <div className="loading"></div>}Send OTP
      </button>
    </form>
  );
};

export default EmailForm;
