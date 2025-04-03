import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/layout/Header/Header";
import Footer from "./Components/layout/Footer/Footer";
import BackToTop from "./Components/BackToTop/BackToTop";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { About, Authentication, Contact, Destinations, EditItinerary, Home, Itinerary, NotFound, PlanDetails, ResetPassword, TripPlan, UserDashboard, VerifyEmail } from "./Pages";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./routes";
import ProtectedRoute from "./Components/auth/ProtectedRoute";

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
        <ToastContainer />
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.AUTHENTICATE} element={<Authentication />} />
          <Route path="/destinations" element={<ProtectedRoute> <Destinations /></ProtectedRoute>} />
          <Route path="/trip-plan" element={<TripPlan />} />
          <Route path={ROUTES.PLAN_DETAILS} element={<PlanDetails />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path="/plan-details/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute> } />
          <Route path="/account" element={<UserDashboard />} />
          <Route path="/account/edit-itinerary" element={<EditItinerary />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
        <BackToTop/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
