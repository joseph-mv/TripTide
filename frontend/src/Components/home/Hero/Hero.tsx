import React from "react";
import { useNavigate } from "react-router-dom";
import PlanButton from "./PlanButton/PlanButton";

import "./Hero.css";
import { ROUTES } from "../../../routes";

/**
 * Hero section in Home page
 */
function Hero() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Next Adventure</h1>
          <p className="pg">
            Plan your trips, explore new destinations, and connect with fellow
            travelers.
          </p>

          <div onClick={() => navigate(ROUTES.TRIP_PLAN)}>
            <PlanButton className="planButton" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
