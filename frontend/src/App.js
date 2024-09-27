import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Authenticate from "./Pages/Authenticate";
import TripPlan from "./Pages/TripPlan";
import PlanDetails from "./Pages/PlanDetails";
import Verification from "./Pages/Verification";
import ForgotPassword from "./Pages/ForgotPassword";
import Itinerary from "./Pages/Itinerary/Itinerary";
import ScrollToTop from "../src/Components/ScrollToTop/ScrollToTop";
import DestinationsPage from "./Pages/Destinations";
import AboutSection from "./Pages/AboutSection";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactSection from "./Pages/ContactSection";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/trip-plan" element={<TripPlan />} />
          <Route path="/plan-details" element={<PlanDetails />} />
          <Route path="/verify-email" element={<Verification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/plan-details/itinerary" element={<Itinerary />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path='/contact' element={<ContactSection/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
