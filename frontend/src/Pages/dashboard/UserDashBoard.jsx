import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";


import "../../styles/pages/dashboard/UserDashBoard.css"; // Import the CSS file
import { isTokenExpired } from "../../utils/isTokenExpired";
import { refreshToken } from "../../utils/refreshToken";
import { getUserInformation } from "../../services/userService";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faClock,
//   faUsers,
//   faBicycle,
//   faRoute,
//   faHourglassHalf,
//   faDollarSign,
//   faStickyNote,
//   faEye,
//   faImage,
// } from "@fortawesome/free-solid-svg-icons";


import UserTrip from "../../Components/UserDashBoard/UserTrip/UserTrip";
import OngoingTrips from "../../Components/UserDashBoard/OngoingTrips/OngoingTrips";
import Navbar from "../../Components/UserDashBoard/NavBar/Navbar";
import Profile from "../../Components/UserDashBoard/Profile/Profile";
import Connections from "../../Components/UserDashBoard/Connections/Connections";


const UserDashboard = () => {
  var token = useRef(localStorage.getItem("token"));
  const [trips, setTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("currentTrip");
  const navigate = useNavigate();
  const today = new Date(); // Current date and time
  const currentDate = new Date(today.toISOString().split("T")[0]); // Today's date at 00:00:00
  const userData=useSelector(store=>store.user)
  useEffect(() => {
    async function getUser() {
      if (!token.current) {
        // console.log("No token");
        navigate("/authenticate");
        return;
      } 
      else if (isTokenExpired(token.current)) {
        console.log("Token expired");
        token.current = await refreshToken();
        if (!token.current) {
          navigate("/authenticate");
        }
      }

      try {
        const response = await getUserInformation()
        setTrips(response);    
      } catch (error) {
        alert(error.message)
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
          <Connections/>
        );
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
     
    <Profile userData={userData}/>
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>

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
