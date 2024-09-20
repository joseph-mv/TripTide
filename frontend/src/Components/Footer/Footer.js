import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <hr></hr>
      <div className="footer-content">
        <div className="footer-logo">
          <h1>TripTide</h1>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="footer-info">
          <p>
            &copy; {new Date().getFullYear()} TripTide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
