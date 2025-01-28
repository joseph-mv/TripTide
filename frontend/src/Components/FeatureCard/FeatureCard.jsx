import React from "react";
import "./FeatureCard.css"; // Import the CSS file

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card" data-aos="fade-left">
      <div className="feature-icon">
        <i className={icon}></i>
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default FeatureCard;
