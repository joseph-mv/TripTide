db = require("../config/connection");
const { response } = require("express");
const collection = require("../config/collection");
const getRectangleCorners = require("../utils/mapRectangle");
const locationType = {
  sightseeing: [
    "Natural Park",
    "Waterfall",
    "Nature Reserve",
    "Dam",
    "Lake",
    
  ],
  adventure: ["Hiking", "Caves", "Amusement Park", "Lake", "Campsite"],
  shopping: ["City"],
  relaxation: ["Beach", "Resort"],
  cultural: ["Historical monument", "Museum"],
  others: ["Zoo", "Desert"],
};


module.exports = {
  searchAlong: (coordinates, distance, activities) => {
    // console.log(coordinates.length);
    var typeLabelArr = ["Tourist Attraction", "Tourist Destination"];
 for (let key in activities) {
      if (activities[key] === "true") {
        typeLabelArr = [...typeLabelArr, ...locationType[key]];
      }

    }
    // console.log('type',typeLabelArr)

    return new Promise(async (resolve, reject) => {
      try {
        const width = Math.max(10, Math.min(parseFloat(distance) / 20, 200));
        // console.log(width);
        var touristLocations = [];
        var seen = new Set();

        // Array to hold all the promises for the database queries
        const promises = [];

        for (let i = 0; i < coordinates.length-1; i++) {
          let polygonCoordinates = await getRectangleCorners(
            coordinates[i],
            coordinates[i + 1],
            width
          );
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

          // Push the promise of the database query to the promises array
          promises.push(
            db
              .get()
              .collection(collection.TOURIST_Collection)
              .find(query)
              .toArray()
              .then((response) => {
                //    console.log('db response')
                // console.log(response);
                response.forEach((element) => {
                  if (!seen.has(element.siteLabel)) {
                    seen.add(element.siteLabel);
                    touristLocations.push(element);
                  }
                });
              })
          );
        }

        // Wait for all the promises to resolve
        await Promise.all(promises);

        // console.log(touristLocations);
        // console.log(touristLocations.length);

        resolve(touristLocations);
      } catch (error) {
        reject(error);
      }
    });
  },

  getDestinations:({coordinates,distance,type,activities})=>{
    distance=distance?distance:'5'
    // console.log(distance)
    coordinates[0]=parseFloat(coordinates[0])
    coordinates[1]=parseFloat(coordinates[1])
    // console.log(coordinates)
    
    var typeLabelArr=[]
    for (let key in activities) {
      if (activities[key] === "true") {
      typeLabelArr.push(...locationType[key])
      }
      
    }
    for(let key in type){
      if(type[key] === "true"){
        typeLabelArr.push(key);
        // console.log("type:"+key)
      }
    }
   
    typeLabelArr=[...new Set(typeLabelArr)]
    // console.log(typeLabelArr);
    return new Promise(async(resolve, reject)=>{
      try{
       const query=
       { typeLabel: { $in: typeLabelArr },
         "location.coordinates": {
           $geoWithin: {
             $centerSphere: [
               coordinates, 
               distance / 6378.1
             ]
           }
         }
       }
        const destinations = await db.get().collection(collection.TOURIST_Collection).find(query).toArray();
        console.log(destinations)
        resolve(destinations);
      }catch(err){
        reject(err);
      }
    })
  }
  
};
