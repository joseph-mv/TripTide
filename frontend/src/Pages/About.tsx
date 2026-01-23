import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import "../styles/pages/About.css";
import { ROUTES } from "../routes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const keyPoints = [
  {
    point:
      " Personalized planning: Users can create custom itineraries based on their preferences.",
  },
  {
    point:
      "Interactive exploration: The map allows for easy discovery of destinations.",
  },
  {
    point:
      "Efficient filtering: Users can narrow down options based on specific criteria.",
  },
  {
    point: "Time-saving features: Saved plans can be reused for future trips.",
  },
];
/**
 * About page
 */
const About = () => {
  return (
    <div className="about-section">
      <h1>About Us</h1>

      {/* Introduction Section */}
      <section className="about-introduction">
        <img src="/image/about1.webp" alt="" data-aos="fade-right"></img>
        <div>
          <h2>Escape the Ordinary: Plan Your Adventure</h2>
          <p>
            TripTide is your ultimate travel planning companion. Discover
            exciting destinations around the world and effortlessly create
            personalized itineraries. Our interactive map lets you explore and
            select locations based on your preferences, while our powerful tools
            help you filter by location, type, and activities. Save your plans
            for future trips and embark on unforgettable adventures with ease.
          </p>

          <ul>
            {keyPoints.map((keyPoint) => (
              <li>
                <FontAwesomeIcon icon={regularStar as IconProp} className="icon" />
                {keyPoint.point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mission_team_container">
        <div>
          {/* Mission and Vision */}
          <section className="about-mission-vision">
            <h2>Mission and Vision</h2>
            <p>
              At TripTide, we believe that travel should be a delightful and
              stress-free experience. Our vision is to empower travelers with
              the tools and information they need to explore new places, create
              unforgettable memories, and enjoy the journey as much as the
              destination.
            </p>
          </section>

          {/* About the Founder */}
          <section className="about-team">
            <h2>About the Founder</h2>
            <p>
              TripTide was created by a passionate travel enthusiast and tech
              expert who believes in the power of exploration. As a dedicated
              Full stack developer, Joseph M V is committed to providing the
              best travel planning experience possible.
            </p>
          </section>

          {/* Our Story */}
          <section className="about-story">
            <h2>Our Story</h2>
            <p>
              The idea for TripTide was born from countless road trips and a
              desire to make travel planning easier and more enjoyable.
              Frustrated with the lack of comprehensive tools for planning
              routes and discovering hidden gems along the way, we set out to
              create a platform that would change the way people travel.
            </p>
          </section>
        </div>
        <img src="/image/about2.webp" alt="" data-aos="fade-left"></img>
      </div>

      {/* Contact us */}
      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>
          I love hearing from our users! If you have any questions, feedback, or
          need support, please don't hesitate to{" "}
          <Link to={ROUTES.CONTACT}>contact us</Link>
        </p>
      </section>

      {/* Call to Action */}
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
