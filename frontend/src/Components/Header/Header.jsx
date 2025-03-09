// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { motion } from "framer-motion";
import { FaMapLocation } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { SiImessage } from "react-icons/si";
import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { BiTrip } from "react-icons/bi";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {userName}=useSelector(store=>store.user)
  const dispatch=useDispatch()
   const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch({type:"REMOVEUSER"})
    setToken("");
    setIsOpen(false)
  };
  if (refreshToken && isTokenExpired(refreshToken)) {
    // console.log("Refresh token expired");
    setRefreshToken("");
    handleLogout();
  }
  const toggleMenu = () => {
    console.log('toggle')
    if (!isOpen) {
      document.body.classList.add("fixed-body");
    } else {
      document.body.classList.remove("fixed-body");
    }
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    document.body.classList.remove("fixed-body");
  }, []);
  const shadowAnimation = {
    filter: [
      "drop-shadow(0px 0px 0px rgba(248, 15, 15, 0))",
      "drop-shadow(2px 2px 2px rgba(248, 15, 15, 0.25))",
      "drop-shadow(5px 5px 5px rgba(248, 15, 15, 0.5))",
      "drop-shadow(7px 7px 7px rgba(248, 15, 15, 0.75))",
      "drop-shadow(10px 10px 10px rgba(248, 15, 15, 1))",
      "drop-shadow(7px 7px 7px rgba(248, 15, 15, 0.75))",
      "drop-shadow(5px 5px 5px rgba(248, 15, 15, 0.5))",
      "drop-shadow(2px 2px 2px rgba(248, 15, 15, 0.25))",
    ],
    transition: {
      filter: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const wavingAnimation = {
    x: [0, 5, -5, 0],
    skewX: [0, 5, -5, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  };

  return (
    <div>
      <header>
        <div className="logo">
          <motion.img
            src="../../../logo/3.png"
            alt="Logo"
            animate={shadowAnimation}
            style={{ width: "150px", height: "auto" }} // Adjust according to your logo size
          />
        </div>
        <button className="menu-toggle">
          <label className="burger" htmlFor="burger">
            <input
              className="menu-toggle"
              type="checkbox"
              checked={isOpen} 
              id="burger"
              onChange={toggleMenu}
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </button>
        <nav className={isOpen ? "nav-open" : ""}>
          <Link className="link" onClick={toggleMenu} to="/">
            <AiFillHome />
            &nbsp;&nbsp; <span>Home</span>
          </Link>
          <Link className="link" onClick={toggleMenu} to="/destinations">
            <FaMapLocation /> &nbsp;&nbsp;Destinations
          </Link>
          <Link className="link" onClick={toggleMenu} to="/trips">
            <BiTrip />
            &nbsp;&nbsp;Trips
          </Link>
          <Link className="link" onClick={toggleMenu} to="/about">
            {" "}
            <AiOutlineInfoCircle />
            &nbsp;&nbsp;About
          </Link>
          <Link className="link" onClick={toggleMenu} to="/contact">
            {" "}
            <SiImessage />
            &nbsp;&nbsp;Contact
          </Link>
          <Link className="link" onClick={toggleMenu} to={userName?"/account":"/authenticate"}>
            <MdAccountCircle />
            &nbsp;&nbsp;{userName ? userName : "Account"}
          </Link>
          <Link onClick={handleLogout} className="link"  to="/authenticate">
            &nbsp;&nbsp; &nbsp;&nbsp;{userName ? "Logout" : ""}
          </Link>
        </nav>
      </header>
      <motion.div className="travelFlag" animate={wavingAnimation} />
    </div>
  );
};

export default Header;
