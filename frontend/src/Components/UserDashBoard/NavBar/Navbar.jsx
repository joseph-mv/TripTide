import React from 'react'

const Navbar = ({activeTab,setActiveTab}) => {
  return (
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
  )
}

export default Navbar