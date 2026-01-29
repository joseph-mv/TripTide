import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { filterTrips } from "../../utils/tripUtils";
import "../../styles/pages/dashboard/UserDashBoard.css";
import { getUserInformation } from "../../services/userService";
import Navbar from "../../Components/UserDashBoard/NavBar/Navbar";
import Profile from "../../Components/UserDashBoard/Profile/Profile";
import UserTrip from "../../Components/UserDashBoard/UserTrip/UserTrip";
import Connections from "../../Components/UserDashBoard/Connections/Connections";
import OngoingTrips from "../../Components/UserDashBoard/OngoingTrips/OngoingTrips";

import { RootState } from "../../redux/store";
import { Trip } from "../../types";

/**
 * UserDashBoard page
 * render content based on the activeTab , shows user information and edit options
 */
const UserDashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTab, setActiveTab] = useState("currentTrip");
  const userData = useSelector((store: RootState) => store.user);

  //fetch all trips of user
  useEffect(() => {
    async function getUser() {
      try {
        const response = await getUserInformation();
        setTrips(response);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    getUser();
  }, []);

  const [upcomingTrips, completedTrips, ongoingTrips] = filterTrips(trips)

  // Handle ongoing trips updates (e.g., when a trip is deleted)
  const handleOngoingTripsUpdate = (updatedOngoingTrips: Trip[]) => {
    // Find the deleted trip ID by comparing original and updated ongoing trips
    const deletedTripId = ongoingTrips.find(
      (trip) => !updatedOngoingTrips.some((updated) => updated._id === trip._id)
    )?._id;

    // Remove the deleted trip from the main trips array
    if (deletedTripId) {
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== deletedTripId));
    }
  };

  // render content corresponding to activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "currentTrip":
        return <OngoingTrips ongoingTrips={ongoingTrips} onTripsUpdate={handleOngoingTripsUpdate} />;
      case "upcomingTrips":
        return (
          <div className="content-section">
            <h2>Upcoming Trips</h2>
            <ul>
              {upcomingTrips
                .sort(
                  (a, b) =>
                    new Date(a.details.startDate).getTime() -
                    new Date(b.details.startDate).getTime()
                )
                .map((trip) => {
                  return <UserTrip trip={trip} setTrips={setTrips} />;
                })}
            </ul>
          </div>
        );
      case "tripHistory":
        return (
          <div className="content-section">
            <h2>Trip History</h2>
            <ul>
              {completedTrips
                .sort(
                  (a, b) =>
                    new Date(a.details.startDate).getTime() -
                    new Date(b.details.startDate).getTime()
                )
                .map((trip) => (
                  <UserTrip trip={trip} setTrips={setTrips} />
                ))}
            </ul>
          </div>
        );
      case "connections":
        return <Connections />;
      case "savedDestinations":
        return (
          <div className="content-section">
            <h2>Saved Destinations</h2>
          </div>
        );
      case "recommendedDestinations":
        return (
          <div className="content-section">
            <h2>Recommended Destinations</h2>
          </div>
        );
      case "notifications":
        return (
          <div className="content-section">
            <h2>Notifications</h2>
          </div>
        );
      case "accountSettings":
        return (
          <div className="content-section">
            <h2>Account Settings</h2>
            <p>Manage your account settings here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <Profile userData={userData} />
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Content */}
      {renderContent()}

      <div className="action-buttons">
        <button>Explore New Destinations</button>
        <button>Invite Friends</button>
      </div>
    </div>
  );
};

export default UserDashboard;
