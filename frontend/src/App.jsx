
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import {
  About,
  Authentication,
  Contact,
  Destinations,
  EditItinerary,
  Home,
  Itinerary,
  NotFound,
  PlanDetails,
  ResetPassword,
  TripPlan,
  UserDashboard,
  VerifyEmail,
} from "./Pages";
import { ROUTES } from "./routes";
import Layout from "./Components/layout/Layout";
import ProtectedRoute from "./Components/auth/ProtectedRoute";

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Layout>
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
              <Route path={ROUTES.DESTINATIONS} element={<Destinations />} />
              <Route path={ROUTES.CREATE_ITINERARY} element={<Itinerary />} />
              <Route path={ROUTES.DASHBOARD} element={<UserDashboard />} />
              <Route
                path={ROUTES.EDIT_ITINERARY + "/:tripId"}
                element={<EditItinerary />}
              />
            </Route>

            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
