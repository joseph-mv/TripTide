import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/layout/Header/Header";
import Footer from "./Components/layout/Footer/Footer";
import BackToTop from "./Components/layout/BackToTop/BackToTop";
import ScrollToTop from "./Components/layout/ScrollToTop";
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
          <Route path={ROUTES.TRIP_PLAN} element={<TripPlan />} />
          <Route path={ROUTES.PLAN_DETAILS} element={<PlanDetails />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />

          {/* Protected Routes  */}
          <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DESTINATIONS} element={ <Destinations />} />
          <Route path={ROUTES.CREATE_ITINERARY} element={<Itinerary /> } />
          <Route path={ROUTES.DASHBOARD} element={<UserDashboard /> } />
          <Route path={ROUTES.EDIT_ITINERARY+'/:tripId'} element={<EditItinerary />} />
          </Route>
          
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
        <BackToTop/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
