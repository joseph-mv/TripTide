import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import BackToTop from "./Components/BackToTop/BackToTop";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { About, Authentication, Contact, Destinations, EditItinerary, Home, Itinerary, PlanDetails, ResetPassword, TripPlan, UserDashboard, VerifyEmail } from "./Pages";

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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authenticate" element={<Authentication />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/trip-plan" element={<TripPlan />} />
          <Route path="/plan-details" element={<PlanDetails />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/plan-details/itinerary" element={<Itinerary />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<UserDashboard />} />
          <Route path="/account/edit-itinerary" element={<EditItinerary />} />
        </Routes>
        <BackToTop/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
