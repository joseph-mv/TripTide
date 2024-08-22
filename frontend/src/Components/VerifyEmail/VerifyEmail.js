import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './VerifyEmail.css'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
const VerifyEmail = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
 
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/verify-email?token=${token}`);
        // console.log(response);
        setMessage(response.data);
      } catch (error) {
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
           
            <a href="/authenticate" className="message-button">Go to Login</a>
          </>
        ) : (
          <>
            <FaTimesCircle className="message-icon failure-icon" />
            <div className="message-title">Email Verification Failed</div>
            
            <a href="/contact" className="message-button">Contact Support</a>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
