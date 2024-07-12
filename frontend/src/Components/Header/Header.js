// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { motion } from 'framer-motion';
import { FaMapLocation } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { SiImessage } from "react-icons/si";
import { AiFillHome, AiOutlineCompass, AiOutlineCarryOut, AiOutlineInfoCircle, AiOutlineContacts, AiOutlineUser } from 'react-icons/ai';
import { BiTrip } from "react-icons/bi";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const shadowAnimation = {
    filter: [
      "drop-shadow(10px 10px 10px rgb(248, 15, 15))",
      "drop-shadow(1px 1px 10px rgb(248, 15, 15,0.75))",
      "drop-shadow(5px 5px 10px rgb(248, 15, 15,0.25))",
      "drop-shadow(5px 5px 10px rgb(248, 15, 0))",
      
    ],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
    }
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
      
      style={{ width: '150px', height: 'auto' }} // Adjust according to your logo size
    /></div>
      <button className="menu-toggle">
      <label className="burger" htmlFor="burger">
  <input className='menu-toggle' type="checkbox" id="burger" onChange={toggleMenu}  />
  <span></span>
  <span></span>
  <span></span>
</label>

      </button>
      <nav className={isOpen ? 'nav-open' : ''}>
        <Link className='link' to="/"><AiFillHome />&nbsp;&nbsp; <span>Home</span> </Link>
        <Link className='link' to="/destinations"><FaMapLocation /> &nbsp;&nbsp;Destinations</Link>
        <Link className='link'to="/trips"><BiTrip />&nbsp;&nbsp;Trips</Link>
        <Link className='link' to="/about"> <AiOutlineInfoCircle />&nbsp;&nbsp;About</Link>
        <Link className='link'to="/contact"> <SiImessage />&nbsp;&nbsp;Contact</Link>
        <Link className='link' to="/authenticate"><MdAccountCircle />&nbsp;&nbsp;Account</Link>
      </nav>
    </header>
    <motion.div className='travelFlag' animate={wavingAnimation} />
    </div>
  );
};

export default Header;
