import { motion } from "framer-motion";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../../styles/pages/auth/ResetPassword.css";
import EmailForm from "../../Components/auth/EmailForm";
import PasswordResetForm from "../../Components/auth/PasswordResetForm";

/**
 * **ResetPassword Page**
 * - Manages the password reset process.
 * - Displays either the email submission form or the OTP/password reset form based on `otpSent`.
 */
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(true);// Tracks whether OTP has been sent
 
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
           {/* Render Email Form or Password Reset Form based on `otpSent` */}
          {!otpSent ? (
            <EmailForm
              setOtpSent={setOtpSent}
              setError={setError}
              email={email}
              setEmail={setEmail}
            />
          ) : (
            <PasswordResetForm email={email} setError={setError}/>
          )}
          {error && <p className="error">{error}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
