// src/components/Features.js
import React from 'react';
import PlanButton from '../../assets/PlanButton';
import './Features.css'
const Features = () => (
  <section className="features">
    <h2>Our Features</h2>
  <PlanButton className='a'/>
    <div className="feature-item">Plan your trips effortlessly</div>
    <div className="feature-item">Discover amazing destinations</div>
    <div className="feature-item">Connect with fellow travelers</div>
  </section>
);

export default Features;
