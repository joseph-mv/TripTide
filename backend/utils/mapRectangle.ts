function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

function toDeg(value: number): number {
  return (value * 180) / Math.PI;
}

function haversineDistance(point1: number[], point2: number[]): number {
  try {
    const lon1 = point1[0];
    const lat1 = point1[1];
    const lon2 = point2[0];
    const lat2 = point2[1];
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

function calculateNewPoint(latitude: number, longitude: number, distance: number, bearing: number): number[] {
  const R = 6371; // Radius of the Earth in km
  const d = distance / R; // Angular distance in radians

  const lat1 = toRad(latitude);
  const lon1 = toRad(longitude);

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d) +
    Math.cos(lat1) * Math.sin(d) * Math.cos(bearing)
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(d) * Math.cos(lat1),
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
    );

  return [toDeg(lon2), toDeg(lat2)];
}

const getRectangleCorners = function (point1: number[], point2: number[], width: number): number[][] {
  try {
    // Calculate the distance between the two points
    // const distanceBetweenPoints = haversineDistance(point1, point2);

    const bearing = Math.atan2(
      Math.sin(toRad(point2[0] - point1[0])) * Math.cos(toRad(point2[1])),
      Math.cos(toRad(point1[1])) * Math.sin(toRad(point2[1])) -
      Math.sin(toRad(point1[1])) *
      Math.cos(toRad(point2[1])) *
      Math.cos(toRad(point2[0] - point1[0]))
    );

    const nextPoint = calculateNewPoint(point2[1], point2[0], width, bearing);

    const perpendicularBearing1 = bearing + Math.PI / 2;
    const perpendicularBearing2 = bearing - Math.PI / 2;

    const firstCorner = calculateNewPoint(
      point1[1],
      point1[0],
      width,
      perpendicularBearing1
    );
    const secondCorner = calculateNewPoint(
      point1[1],
      point1[0],
      width,
      perpendicularBearing2
    );
    const thirdCorner = calculateNewPoint(
      nextPoint[1],
      nextPoint[0],
      width,
      perpendicularBearing2
    );
    const fourthCorner = calculateNewPoint(
      nextPoint[1],
      nextPoint[0],
      width,
      perpendicularBearing1
    );

    return [firstCorner, secondCorner, thirdCorner, fourthCorner, firstCorner];
  } catch (err) {
    console.error(err);
    return [];
  }
};
export default getRectangleCorners;


