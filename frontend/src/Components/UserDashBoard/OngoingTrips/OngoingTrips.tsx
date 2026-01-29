import React, { useMemo, useState, useEffect } from "react";
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
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { OngoingTrip, Trip } from "../../../types";
import { getOngoingTrip } from "../../../services/userService";

interface OngoingTripsProps {
  ongoingTrips: Trip[];
  onTripsUpdate?: (updatedOngoingTrips: Trip[]) => void;
}

interface TripDetailItem {
  icon: typeof faClock;
  label: string;
  value: string | number;
}

/**
 * Calculates the number of days between start date and today
 */
const calculateDaysSinceStart = (startDate: string): number => {
  const start = new Date(startDate);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // +1 to include the start day
};

/**
 * Formats trip details into a structured array for rendering
 */
const formatTripDetails = (trip: OngoingTrip): TripDetailItem[] => {
  if (!trip) return [];
  
  return [
    { icon: faClock, label: "Days", value: trip.noOfDays || "N/A" },
    { icon: faBicycle, label: "Ride", value: trip.details.transportation },
    { icon: faUsers, label: "Trippers", value: trip.details.numPeople },
    {
      icon: faDollarSign,
      label: "Budget",
      value: `${trip.details.budget} ${trip.details.currency}`,
    },
    { icon: faRoute, label: "Distance", value: `${trip.distance} km` },
    { icon: faHourglassHalf, label: "Travel Duration", value: trip.travelTime || "N/A" },
    { icon: faStickyNote, label: "notes", value: trip.details.notes || "None" },
  ];
};

/**
 * Single trip card component
 */
const SingleTripCard = ({ trip, setTrips }: { trip: Trip; setTrips: React.Dispatch<React.SetStateAction<Trip[]>> }) => {
  const [ongoingTrip, setOngoingTrip] = useState<OngoingTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const daysSinceStart = useMemo(() => calculateDaysSinceStart(trip.details.startDate), [trip.details.startDate]);

  useEffect(() => {
    if (!trip._id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getOngoingTrip(trip._id)
      .then((data) => {
        if (!cancelled) setOngoingTrip(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load trip");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [trip._id]);

  const tripDetails = useMemo(
    () => (ongoingTrip ? formatTripDetails(ongoingTrip) : []),
    [ongoingTrip]
  );

  return (
    <div className="trip-card">
      <h3>{trip.name}</h3>
      <UserTrip trip={trip} setTrips={setTrips} current />
      
      <div className="day-counter">
        <div>Day</div>
        <div>{daysSinceStart}</div>
      </div>

      <div className="place-container">
        <div className="place">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p>{ongoingTrip?.details.startingPoint ?? "—"}</p>
          <p>{trip.details.startDate}</p>
        </div>

        <div className="additional-info">
          {loading && <p>Loading trip details…</p>}
          {error && <p>{error}</p>}
          {!loading && !error && tripDetails.map((detail, index) => (
            <p key={index}>
              <strong>
                <FontAwesomeIcon icon={detail.icon} /> {detail.label}:
              </strong>{" "}
              {detail.value}
            </p>
          ))}
        </div>

        <div className="place">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p>{ongoingTrip?.details.destination ?? "—"}</p>
          <p>{trip.details.endDate}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Multiple trips error message component
 */
const MultipleTripsError = () => (
  <div className="current-error">
    <p>
      You have multiple trips currently in progress. To ensure a smooth travel
      experience, please review your trip details and choose one of the
      following options:
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
);

/**
 * OngoingTrips component
 * Displays ongoing trips with different views based on the number of trips
 */
const OngoingTrips = ({ ongoingTrips, onTripsUpdate }: OngoingTripsProps) => {
  // Local state needed for UserTrip's setTrips callback to work properly
  const [localTrips, setLocalTrips] = useState<Trip[]>(ongoingTrips);

  // Sync local state when props change
  useEffect(() => {
    setLocalTrips(ongoingTrips);
  }, [ongoingTrips]);

  // Handle trips update from UserTrip component
  // This wrapper ensures we notify the parent when trips are updated
  const handleTripsUpdate: React.Dispatch<React.SetStateAction<Trip[]>> = (action) => {
    setLocalTrips((prevTrips) => {
      const updatedTrips = typeof action === 'function' ? action(prevTrips) : action;
      // Notify parent component of the update
      onTripsUpdate?.(updatedTrips);
      return updatedTrips;
    });
  };

  if (localTrips.length === 0) {
    return (
      <div>
        <p>No trips right now. Start planning your next adventure!</p>
      </div>
    );
  }

  if (localTrips.length === 1) {
    return (
      <SingleTripCard trip={localTrips[0]} setTrips={handleTripsUpdate} />
    );
  }

  return (
    <ul>
      <MultipleTripsError />
      {localTrips.map((trip) => (
        <div key={trip._id}>
          <UserTrip trip={trip} setTrips={handleTripsUpdate} current={false} />
        </div>
      ))}
    </ul>
  );
};

export default OngoingTrips;
