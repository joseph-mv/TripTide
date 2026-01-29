import classNames from "classnames";
import { useState, useEffect } from "react";

import "../../styles/pages/auth/Authentication.css";
import LoginForm from "../../Components/auth/LoginForm";
import SignupForm from "../../Components/auth/SignupForm";

/**
 * Authentication component handles toggling between sign-in and sign-up views.
 * It uses a single state to manage the form display and applies conditional styling.
 */
const Authentication = () => {

  const [isSignIn, setIsSignIn] = useState(false);

  /**
   * Toggles the authentication view between sign-in and sign-up.
   * Uses the previous state to ensure predictable updates.
   */
  const toggleAuthView = () => {
    setIsSignIn(!isSignIn);
  };

  // Effect to set initial view to sign-in after a slight delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);


  return (
    <div
      id="container"
      className={classNames("container", {
        "sign-in": isSignIn,
        "sign-up": !isSignIn,
      })}
    >
      {/* Form Section: Contains both signup and login forms */}
      <div className="row">
        <SignupForm toggleAuthView={toggleAuthView} />
        <LoginForm toggleAuthView={toggleAuthView} />
      </div>

      {/* Content Section: Displays contextual text and images */}
      <div className="row content-row">
        {/* Sign-In Content */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>

        {/* Sign-Up Content */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Authentication;
