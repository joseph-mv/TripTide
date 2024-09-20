import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const About = () => {
  return (
    <div className="about-section">
      <h1>About Us</h1>

      <section className="about-introduction">
       
        <img src="/image/about1.jpg" data-aos="fade-right" ></img>
        <div>
        <h2>Escape the Ordinary: Plan Your Adventure</h2>
        <p>
          "TripTide is your ultimate travel planning companion. Discover
          exciting destinations around the world and effortlessly create
          personalized itineraries. Our interactive map lets you explore and
          select locations based on your preferences, while our powerful tools
          help you filter by location, type, and activities. Save your plans for
          future trips and embark on unforgettable adventures with ease."
        </p>

        <ul>
      <li>
        <FontAwesomeIcon icon={regularStar} className="icon"/> Personalized planning: Users can create custom itineraries based on their preferences.
      </li>
      <li>
        <FontAwesomeIcon icon={regularStar} className="icon"/> Interactive exploration: The map allows for easy discovery of destinations.
      </li>
      <li>
        <FontAwesomeIcon icon={regularStar} className="icon"/> Efficient filtering: Users can narrow down options based on specific criteria.
      </li>
      <li>
        <FontAwesomeIcon icon={regularStar} className="icon"/> Time-saving features: Saved plans can be reused for future trips.
      </li>
    </ul>
    </div>
      </section>
    <div className="mission_team_container" >
        <div>
      <section className="about-mission-vision">
        <h2>Mission and Vision</h2>
        <p>
          At TripTide, we believe that travel should be a delightful and
          stress-free experience. Our vision is to empower travelers with the
          tools and information they need to explore new places, create
          unforgettable memories, and enjoy the journey as much as the
          destination.
        </p>
      </section>

      <section className="about-team" >
        <h2>About the Founder</h2>
        <p>
          TripTide was created by a passionate travel enthusiast and tech expert
          who believes in the power of exploration. As a dedicated MERN stack
          developer, Joseph M V is committed to providing the best travel
          planning experience possible.
        </p>
      </section>
      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          The idea for TripTide was born from countless road trips and a desire
          to make travel planning easier and more enjoyable. Frustrated with the
          lack of comprehensive tools for planning routes and discovering hidden
          gems along the way, we set out to create a platform that would change
          the way people travel.
        </p>
      </section>
      
      </div>
      <img src="/image/about2.jpeg" data-aos="fade-left"  ></img>
      </div>
      
      


      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>
          I love hearing from our users! If you have any questions, feedback,
          or need support, please don't hesitate to{" "}
          <Link to="/contact">contact us</Link>
        </p>
      </section>

      <section className="about-cta">
        <h2>Call to Action</h2>
        <p>
          Ready to start your next adventure? Sign up today and let TripTide be
          your guide to unforgettable journeys!
        </p>
      </section>
    </div>
  );
};

export default About;
