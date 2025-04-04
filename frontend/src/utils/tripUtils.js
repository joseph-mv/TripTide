export const filterTrips=(trips)=>{
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
      return [upcomingTrips,completedTrips,ongoingTrips]
}