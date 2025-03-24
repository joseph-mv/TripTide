import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import "../../styles/pages/auth/VerifyEmail.css";
import { verifyEmail } from "../../services/authService";
import { ROUTES } from "../../routes";

const VerifyEmail = () => {
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    /*
     * Performs necessary verification checks during page load.
     */
    const verify = async () => {
      try {
        setLoading(true);
        const response = await verifyEmail(token);
        setMessage(response.msg);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="message-container">
      {loading ? (
        <div style={{ scale: "3" }} className="loading"></div>
      ) : (
        <div className="message-box">
          {message ? (
            <>
              {/* Success message */}
              <FaCheckCircle className="message-icon success-icon" />
              <div className="message-title">{message}</div>

              <Link to={ROUTES.AUTHENTICATE} className="message-button">
                Go to Login
              </Link>
            </>
          ) : (
            <>
              {/* Error message */}
              <FaTimesCircle className="message-icon failure-icon" />
              <div className="message-title">{error}</div>

              <Link to={ROUTES.CONTACT} className="message-button">
                Contact Support
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
