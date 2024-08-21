function toRad(value) {
    return (value * Math.PI) / 180;
  }
  
 
export function haversineDistance(point1, point2) {
    // const { longitude: lon1, latitude: lat1 } = point1;
    // const { longitude: lon2, latitude: lat2 } = point2;
    // console.log(point2)
    const lon1=point1[0]
    const lat1=point1[1]
    const lon2=point2[0]
    const lat2=point2[1]
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