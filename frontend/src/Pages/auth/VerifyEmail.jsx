import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../styles/pages/auth/VerifyEmail.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const VerifyEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  useEffect(() => {

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/auth/verify-email?token=${token}`
        );
        // console.log(response);
        setMessage(response.data);
      } catch (error) {
        console.log(error)
        setMessage(error.response.data);
      }
    };

    verifyEmail();
  }, [location.search]);

  const isSuccess = message && !message.error;

  return (
    <div className="message-container">
      <div className="message-box">
        
        {isSuccess ? (
          <>
            <FaCheckCircle className="message-icon success-icon" />
            <div className="message-title">Email Verified Successfully!</div>

            <a href="/authenticate" className="message-button">
              Go to Login
            </a>
          </>
        ) : (
          <>
            <FaTimesCircle className="message-icon failure-icon" />
            <div className="message-title">Email Verification Failed</div>

            <a href="/contact" className="message-button">
              Contact Support
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
