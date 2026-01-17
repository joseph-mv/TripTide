import React from 'react'

/**
 * List of navigation tabs for the navbar
 */
const NAV_TABS = [
  { id: 'currentTrip', label: 'Current Trip' },
  { id: 'upcomingTrips', label: 'Upcoming Trips' },
  { id: 'tripHistory', label: 'Trip History' },
  { id: 'connections', label: 'Connections' },
  { id: 'savedDestinations', label: 'Saved Destinations' },
  { id: 'recommendedDestinations', label: 'Recommendations' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'accountSettings', label: 'Account Settings' },
];

/**
 * Navbar component to switch between travel-related tabs
 *
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active tab ID
 * @param {function} props.setActiveTab - Function to update the active tab
 * @returns {JSX.Element} Navbar UI
 */
const Navbar = ({activeTab,setActiveTab}) => {

  return (
    <nav className="navbar">
    {NAV_TABS.map(({ id, label }) => (
        <button
          key={id}
          className={`${activeTab === id ? 'active' : ''}`}
          onClick={() => setActiveTab(id)}
          aria-current={activeTab === id ? 'page' : undefined}
        >
          {label}
        </button>
      ))}
  </nav>
  )
}

export default Navbar