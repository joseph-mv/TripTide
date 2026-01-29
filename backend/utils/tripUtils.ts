import getRectangleCorners from './mapRectangle';

interface LocationTypes {
  [key: string]: string[];
}

const locationType: LocationTypes = {
  sightseeing: ["Natural Park", "Waterfall", "Nature Reserve", "Dam", "Lake"],
  adventure: ["Hiking", "Caves", "Amusement Park", "Lake", "Campsite"],
  shopping: ["City"],
  relaxation: ["Beach", "Resort"],
  cultural: ["Historical monument", "Museum"],
  others: ["Zoo", "Desert"],
};

export const getTypeLabels = (activities: Record<string, any>, typeLabelArr: string[]) => {
  Object.keys(activities).forEach((key) => {
    if (activities[key] === "true") {
      typeLabelArr.push(...(locationType[key] || []));
    }
  });
};

export const searchQuery = (firstCoordinate: number[], secondCoordinate: number[], width: number, typeLabelArr: string[]) => {
  const polygonCoordinates = getRectangleCorners(firstCoordinate, secondCoordinate, width);
  const query = {
    typeLabel: { $in: typeLabelArr },
    "location.coordinates": {
      $geoWithin: {
        $geometry: {
          type: "Polygon",
          coordinates: [polygonCoordinates],
        },
      },
    },
  };
  return query;
};

export default { getTypeLabels, searchQuery };

