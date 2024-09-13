import React, { useState, useEffect } from "react";
import "./BackToTop.css";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  // Show the button when scrolling down
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    showButton && (
      <button
        className="back-to-top"
        onClick={scrollToTop}
        data-aos="fade-left"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    )
  );
};

export default BackToTop;
