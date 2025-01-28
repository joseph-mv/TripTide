import React, { useEffect, useRef, useState } from "react";
import "./UserDashBoard.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUsers,
  faBicycle,
  faRoute,
  faHourglassHalf,
  faDollarSign,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { refreshToken } from "../../utils/refreshToken";
import axios from "axios";
import UserTrip from "../UserTrip/UserTrip";
import OngoingTrips from "./OngoingTrips/OngoingTrips";
const BASE_URL = import.meta.env.VITE_BASE_URL;
// Sample data for demonstration
const userData = {
  name: "John Doe",
  profilePicture: "https://via.placeholder.com/150",
  trips: [
    {
      id: 1,
      title: "Beach Vacation",
      startDate: "2024-07-01",
      endDate: "2024-07-07",
      endPlace: "Miami Beach",
      startPlace: "kozhikode",

      status: "Ongoing",
      duration: 7,
      type: "Leisure",
      noOfPeople: 2,
    },
    {
      id: 2,
      title: "Mountain Retreat",
      startDate: "2024-08-01",
      endDate: "2024-08-07",
      startPlace: "kozhikode",
      endPlace: "Rocky Mountains",
      status: "Upcoming",
      duration: 7,
      type: "Adventure",
      noOfPeople: 4,
    },
  ],
  tripHistory: [
    { id: 1, title: "Summer Road Trip", date: "2024-05-20" },
    { id: 2, title: "City Exploration", date: "2024-06-15" },
  ],
  connections: ["Alice", "Bob", "Charlie"],
  savedDestinations: ["Beach Resort", "Mountain Cabin"],
  recommendedDestinations: ["Maldives", "Switzerland", "Japan"],
  notifications: ["Trip reminders", "New connections", "Special offers"],
};

const UserDashboard = () => {
  var token = useRef(localStorage.getItem("token"));
  const userId = localStorage.getItem("user_Id");
  const userName = localStorage.getItem("user_Name");
  const [trips, setTrips] = useState([]);
  //  console.log(token)
  const [activeTab, setActiveTab] = useState("currentTrip");
  const navigate = useNavigate();
  const today = new Date(); // Current date and time
  const currentDate = new Date(today.toISOString().split("T")[0]); // Today's date at 00:00:00

  useEffect(() => {
    async function getUser() {
      if (!token.current) {
        // console.log("No token");
        navigate("/authenticate");
        return;
      } else if (isTokenExpired(token.current)) {
        // console.log("Token expired");
        token.current = await refreshToken();
        if (!token.current) {
          navigate("/authenticate");
        }
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/user/user-dashboard`,

          {
            params: { userId },
            headers: {
              Authorization: token.current,
            },
          }
        );
        setTrips(response.data);
      } catch (error) {
        // console.error(error);
        // setErrorMessage("Deposit failed. Please try again later.");
      }
    }
    getUser();
  }, []);
  const upcomingTrips = trips.filter((trip) => {
    const startDate = new Date(trip.details.startDate);
    return startDate.getTime() > currentDate.getTime();
  });
  const completedTrips = trips.filter((trip) => {
    const endDate = new Date(trip.details.endDate);
    return endDate.getTime() < currentDate.getTime();
  });
  const ongoingTrips = trips.filter((trip) => {
    const startDate = new Date(trip.details.startDate);
    const endDate = new Date(trip.details.endDate);
    return (
      startDate.getTime() <= currentDate.getTime() &&
      endDate.getTime() >= currentDate.getTime()
    );
  });


  const setCurrentTrip = (tripId) => {
    // Update the trips to mark the selected trip as current and others as not current
    userData.trips.forEach((trip) => {
      trip.status = trip.id === tripId ? "Ongoing" : "Upcoming";
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "currentTrip":
       return <OngoingTrips ongoingTrips={ongoingTrips}/>
      case "upcomingTrips":
        return (
          <div className="content-section">
            <h2>Upcoming Trips</h2>
            <ul>
              {upcomingTrips
                .sort(
                  (a, b) =>
                    new Date(a.details.startDate) -
                    new Date(b.details.startDate)
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
                    new Date(a.details.startDate) -
                    new Date(b.details.startDate)
                )
                .map((trip) => (
                  <UserTrip trip={trip} setTrips={setTrips} />
                ))}
            </ul>
          </div>
        );
      case "connections":
        return (
          <div className="content-section">
            <h2>Connections</h2>
            <ul>
              {userData.connections.map((connection, index) => (
                <li key={index}>{connection}</li>
              ))}
            </ul>
          </div>
        );
      case "savedDestinations":
        return (
          <div className="content-section">
            <h2>Saved Destinations</h2>
            <ul>
              {userData.savedDestinations.map((destination, index) => (
                <li key={index}>{destination}</li>
              ))}
            </ul>
          </div>
        );
      case "recommendedDestinations":
        return (
          <div className="content-section">
            <h2>Recommended Destinations</h2>
            <ul>
              {userData.recommendedDestinations.map((destination, index) => (
                <li key={index}>{destination}</li>
              ))}
            </ul>
          </div>
        );
      case "notifications":
        return (
          <div className="content-section">
            <h2>Notifications</h2>
            <ul>
              {userData.notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
            </ul>
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
      <div className="profile-header">
        <img src={userData.profilePicture} alt="Profile" />
        <h2>Welcome {userName}!</h2>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <button
          className={activeTab === "currentTrip" ? "active" : ""}
          onClick={() => setActiveTab("currentTrip")}
        >
          Current Trip
        </button>
        <button
          className={activeTab === "upcomingTrips" ? "active" : ""}
          onClick={() => setActiveTab("upcomingTrips")}
        >
          Upcoming Trips
        </button>
        <button
          className={activeTab === "tripHistory" ? "active" : ""}
          onClick={() => setActiveTab("tripHistory")}
        >
          Trip History
        </button>
        <button
          className={activeTab === "connections" ? "active" : ""}
          onClick={() => setActiveTab("connections")}
        >
          Connections
        </button>
        <button
          className={activeTab === "savedDestinations" ? "active" : ""}
          onClick={() => setActiveTab("savedDestinations")}
        >
          Saved Destinations
        </button>
        <button
          className={activeTab === "recommendedDestinations" ? "active" : ""}
          onClick={() => setActiveTab("recommendedDestinations")}
        >
          Recommendations
        </button>
        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
        <button
          className={activeTab === "accountSettings" ? "active" : ""}
          onClick={() => setActiveTab("accountSettings")}
        >
          Account Settings
        </button>
      </nav>

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
