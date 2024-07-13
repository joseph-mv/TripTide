// src/components/Hero.js
import React from 'react'
import './Hero.css'

import PlanButton from '../../assets/PlanButton';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="hero">
    <div  className="hero-content">
   <h1>Discover Your Next Adventure</h1>
        <p className='pg'>Plan your trips, explore new destinations, and connect with fellow travelers.</p>
      {/* <button className="hero-button">
<svg  width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.36328 12.0523C4.01081 11.5711 3.33457 11.3304 3.13309 10.9655C2.95849 10.6492 2.95032 10.2673 3.11124 9.94388C3.29694 9.57063 3.96228 9.30132 5.29295 8.76272L17.8356 3.68594C19.1461 3.15547 19.8014 2.89024 20.2154 3.02623C20.5747 3.14427 20.8565 3.42608 20.9746 3.7854C21.1106 4.19937 20.8453 4.85465 20.3149 6.16521L15.2381 18.7078C14.6995 20.0385 14.4302 20.7039 14.0569 20.8896C13.7335 21.0505 13.3516 21.0423 13.0353 20.8677C12.6704 20.6662 12.4297 19.99 11.9485 18.6375L10.4751 14.4967C10.3815 14.2336 10.3347 14.102 10.2582 13.9922C10.1905 13.8948 10.106 13.8103 10.0086 13.7426C9.89876 13.6661 9.76719 13.6193 9.50407 13.5257L5.36328 12.0523Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        Plan Your Trip</button> */}
      <div onClick={()=>navigate('/trip-plan')}>
      <PlanButton  className='planButton'/></div>      
    
     
    
       
        </div>
  </section>
    </div>
  )
}

export default Hero









