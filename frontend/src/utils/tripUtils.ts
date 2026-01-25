import { Trip } from "../types";

export const filterTrips = (trips: Trip[]) => {
  const today = new Date(); //current date and time

  const upcomingTrips = trips.filter((trip) => {
    const startDate = new Date(trip.details.startDate);
    return startDate.getTime() > today.getTime();
  });
  const completedTrips = trips.filter((trip) => {
    const endDate = new Date(trip.details.endDate);
    return endDate.getTime() < today.getTime();
  });
  const ongoingTrips = trips.filter((trip) => {
    const startDate = new Date(trip.details.startDate);
    const endDate = new Date(trip.details.endDate);
    return (
      startDate.getTime() <= today.getTime() &&
      endDate.getTime() >= today.getTime()
    );
  });
  return [upcomingTrips, completedTrips, ongoingTrips];
};

export const selectRouteGeoCoords = (routeGeometry) => {
  const length = routeGeometry.coordinates.length;
  const coordsAlongRoute = [];
  const stepSize = Math.floor(length / 10);
  for (let i = stepSize; i < length && length > 10; i += stepSize) {
    coordsAlongRoute.push(routeGeometry.coordinates[i]);
  }
  coordsAlongRoute.push(routeGeometry.coordinates[length - 1]); //push last coordinate

  return coordsAlongRoute
};
