import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiTrip } from "react-icons/bi";
import { SiImessage } from "react-icons/si";
import { FaMapLocation } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";

import "./Header.css";
import { ROUTES } from "../../../routes";
import { shadowAnimation, wavingAnimation } from "../../../animation/header";

const navLinks = [
  {
    path: ROUTES.HOME,
    label: "Home",
    icon: <AiFillHome />,
  },
  {
    path: ROUTES.DESTINATIONS,
    label: "Destinations",
    icon: <FaMapLocation />,
  },
  {
    path: ROUTES.TRIPS,
    label: "Trips",
    icon: <BiTrip />,
  },
  {
    path: ROUTES.ABOUT,
    label: "About",
    icon: <AiOutlineInfoCircle />,
  },
  {
    path: ROUTES.CONTACT,
    label: "Contact",
    icon: <SiImessage />,
  },
];

/**
 * Header for navigation between pages
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // for hamburg button(in smaller screen)
  const { userName } = useSelector((store) => store.user);

  const toggleMenu = () => {
    if (!isOpen) {
      document.body.classList.add("fixed-body");
    } else {
      document.body.classList.remove("fixed-body");
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <header>
        
        {/* Logo */}
        <div className="logo">
          <motion.img
            src="../../../logo/3.png"
            alt="Logo"
            animate={shadowAnimation}
            style={{ width: "150px", height: "auto" }} 
          />
        </div>

        {/* Hamburg button */}
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

        {/* Nav links */}
        <nav className={isOpen ? "nav-open" : ""}>
          {navLinks.map(({ path, label, icon }) => (
            <Link key={path} className="link" onClick={toggleMenu} to={path}>
              {icon}&nbsp;&nbsp;<span>{label}</span>
            </Link>
          ))}
          <Link
            className="link"
            onClick={toggleMenu}
            to={userName ? ROUTES.DASHBOARD : ROUTES.AUTHENTICATE}
          >
            <MdAccountCircle />
            &nbsp;&nbsp;{userName ? userName : "Account"}
          </Link>
        </nav>
      </header>

      {/* Travel flag */}
      <motion.div className="travelFlag" animate={wavingAnimation} />
    </div>
  );
};

export default Header;
