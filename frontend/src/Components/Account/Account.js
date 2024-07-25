import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./Account.css"; // Make sure to import your CSS
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

const Account = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const handleSignup = async (e) => {
    console.log(name, email);
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  };
  const [loginemail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [loginshowPassword, setLoginShowPassword] = useState(false);

  const handleLogin=async(e)=>{

  }

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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                 {password&&<button className="showHideBtn"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    
                  >
                    <i
                      className={
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>}
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {confirmPassword&&<button className="showHideBtn"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    
                  >
                    <i
                      className={
                        showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>}
                </div>
                {{ error } && <p>{error}</p>}
                <button type="submit">Sign up</button>
                <p>
                  <span>Already have an account?</span>
                  <b onClick={toggle} className="pointer">
                    Sign in here
                  </b>
                </p>
              </form>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <form onSubmit={handleLogin}></form>
            <div className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="email" value={loginemail} onChange={(e)=>setLoginEmail(e.target.value)} placeholder="Email" required/>
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type={loginshowPassword?'text':'password'} value={loginpassword} onChange={(e)=>setLoginPassword(e.target.value)} placeholder="Password" required/>
                {loginpassword&&<button className="showHideBtn"
                    type="button"
                    onClick={() => setLoginShowPassword(!loginshowPassword)}
                    
                  >
                    <i
                      className={
                        loginshowPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </button>}
              </div>
              <button type="submit">Sign in</button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
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
