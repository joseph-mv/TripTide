function toRad(value) {
  return (value * Math.PI) / 180;
}

function toDeg(value) {
  return (value * 180) / Math.PI;
}
function haversineDistance(point1, point2) {
  const { longitude: lon1, latitude: lat1 } = point1;
  const { longitude: lon2, latitude: lat2 } = point2;

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
}
function calculateNewPoint(latitude, longitude, distance, bearing) {
  // console.log(bearing)
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

  return {
    longitude: toDeg(lon2),
    latitude: toDeg(lat2),
  };
}

export function getRectangleCorners(point1, point2) {
  // Calculate the distance between the two points
  const distanceBetweenPoints = haversineDistance(point1, point2);
  console.log(distanceBetweenPoints);
  const width = Math.max(10, Math.min(distanceBetweenPoints / 20, 200));
//  console.log('width'+width)
  const bearing = Math.atan2(
    Math.sin(toRad(point2.longitude - point1.longitude)) *
      Math.cos(toRad(point2.latitude)),
    Math.cos(toRad(point1.latitude)) * Math.sin(toRad(point2.latitude)) -
      Math.sin(toRad(point1.latitude)) *
        Math.cos(toRad(point2.latitude)) *
        Math.cos(toRad(point2.longitude - point1.longitude))
  );
  // console.log(bearing*180/3.14)
  const nextPoint = calculateNewPoint(
    point2.latitude,
    point2.longitude,
    width,
    bearing
  );
  // console.log(nextPoint);
  const perpendicularBearing1 = bearing + Math.PI / 2;
  const perpendicularBearing2 = bearing - Math.PI / 2;
  const firstCorner = calculateNewPoint(
    point1.latitude,
    point1.longitude,
    width,
    perpendicularBearing1
  );
  const secondCorner = calculateNewPoint(
    point1.latitude,
    point1.longitude,
    width,
    perpendicularBearing2
  );
  const thirdCorner = calculateNewPoint(
    nextPoint.latitude,
    nextPoint.longitude,
    width,
    perpendicularBearing1
  );
  const fourthCorner = calculateNewPoint(
    nextPoint.latitude,
    nextPoint.longitude,
    width,
    perpendicularBearing2
  );

  return {
    firstCorner,
    secondCorner,
    thirdCorner,
    fourthCorner,
  };
}

