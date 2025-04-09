import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useForm } from "../../hooks/useForm";
import "../../styles/pages/auth/ResetPassword.css";
import { resetPassword } from "../../services/authService";

const initialForm = {
  newPassword: "",
  confirmPassword: "",
};

/**
 * **PasswordResetForm Component**
 * - Handles OTP verification and password reset.
 *
 * @param {Object} props - Component props
 * @param {string} props.email - The user's email for password reset.
 * @param {Function} props.setError - Function to update error messages.
 */
const PasswordResetForm = ({ email, setError }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]); // Stores the OTP digits
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { form, handleChange, error, handleSubmit, loading } = useForm(
    initialForm,
    async () => {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      const response = await resetPassword(email, otp.join(""), newPassword);
      toast.success(response);
      navigate("/authenticate");
    }
  );

  const { newPassword, confirmPassword } = form;

  useEffect(() => {
    setError(error);
  }, [error]);

  /**
   * Handles OTP input changes.
   */
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next field if a value is entered
    if (index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  /**
   *  Handles Backspace: Move focus back if current field is empty
   */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter OTP</h2>

      {/* OTP Input Fields */}
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            required
            autoFocus={index === 0}
          />
        ))}
      </div>
      <h2>Reset Password</h2>

      {/* New Password Input */}
      <div className="input-group">
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          name="newPassword"
          onChange={handleChange}
          placeholder="Enter new password"
          minLength={6}
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
              className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}
            ></i>
          </button>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="input-group">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          required
          minLength={6}
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

      {/* Submit Button */}
      <button className="submitBtn" type="submit" disabled={loading}>
        {loading && <div className="loading"></div>}Reset Password
      </button>
    </form>
  );
};

export default PasswordResetForm;
