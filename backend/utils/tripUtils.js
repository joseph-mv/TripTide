const getRectangleCorners = require("./mapRectangle");

const locationType = {
    sightseeing: ["Natural Park", "Waterfall", "Nature Reserve", "Dam", "Lake"],
    adventure: ["Hiking", "Caves", "Amusement Park", "Lake", "Campsite"],
    shopping: ["City"],
    relaxation: ["Beach", "Resort"],
    cultural: ["Historical monument", "Museum"],
    others: ["Zoo", "Desert"],
  };

const getTypeLabels=(activities,typeLabelArr)=>{   
    Object.keys(activities).forEach((key) => {
      if (activities[key] === "true") {
        typeLabelArr.push(...(locationType[key] || []));
      }
    });
}

const searchQuery=(firstCoordinate,  secondCoordinate, width,typeLabelArr)=>{
     const polygonCoordinates = getRectangleCorners(firstCoordinate,  secondCoordinate, width );
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
        return query
}

module.exports={getTypeLabels,searchQuery}