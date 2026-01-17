import React, { useEffect, useState } from "react";
import UserTrip from "../UserTrip/UserTrip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faClock,
  faDollarSign,
  faHourglassHalf,
  faRoute,
  faStickyNote,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const OngoingTrips = ({ ongoingTrips }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setTrips(ongoingTrips);
  }, [ongoingTrips]);

  return (
    <div>
      {trips.length === 0 ? (
        <p>No trips right now. Start planning your next adventure!</p>

      ) : trips.length === 1 ? (
        <div className="trip-card">
          <h3>{trips[0]?.name}</h3>
          <UserTrip trip={trips[0]} setTrips={setTrips} current />
          <div className="day-counter">
            <div>Day </div>
            <div>
              {new Date().getDate() -
                new Date(trips[0]?.details.startDate).getDate() +
                1}
            </div>
          </div>
          <div className="place-container">
            <div className="place">
              <i className="fas fa-map-marker-alt"></i>{" "}
              {/* Icon for Start Place */}
              <p>{trips[0]?.details.startingPoint}</p>
              <p>{trips[0]?.details.startDate}</p>
            </div>

            <div className="additional-info">
              <p>
                <strong>
                  <FontAwesomeIcon icon={faClock} /> Days:
                </strong>
                {trips[0]?.noOfDays}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faBicycle} /> Ride:
                </strong>{" "}
                {trips[0]?.details.transportation}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faUsers} /> Trippers:
                </strong>{" "}
                {trips[0]?.details.numPeople}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faDollarSign} /> Budget:
                </strong>{" "}
                {trips[0]?.details.budget} {trips[0]?.details.currency}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faRoute} /> Distance:
                </strong>{" "}
                {trips[0]?.distance} km
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faHourglassHalf} /> Travel Duration:
                </strong>{" "}
                {trips[0]?.travelTime}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faStickyNote} /> notes:
                </strong>{" "}
                {trips[0]?.details.notes}
              </p>
            </div>
            <div className="place">
              <i className="fas fa-map-marker-alt"></i>{" "}
              {/* Icon for End Place */}
              <p>{trips[0]?.details.destination}</p>
              <p>{trips[0]?.details.endDate}</p>
            </div>
          </div>
        </div>
      ) : (
        <ul>
          <div className="current-error">
            <p>
              You have multiple trips currently in progress. To ensure a smooth
              travel experience, please review your trip details and choose one
              of the following options:
            </p>

            <ul>
              <li>
                <strong>Change the date</strong> of one or more trips to avoid
                conflicts.
              </li>
              <li>
                <strong>Delete</strong> one or more trips if they are no longer
                necessary.
              </li>
            </ul>
          </div>
          {trips.map((trip) => {
            return (
              <div>
                <UserTrip trip={trip} setTrips={setTrips} />
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OngoingTrips;
