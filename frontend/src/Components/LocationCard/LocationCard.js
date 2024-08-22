import React, { useEffect, useState } from "react";
import "./LocationCard.css"; // Import the CSS file for styling
import axios from "axios";
import { useDispatch } from "react-redux";
const accessKey = process.env.REACT_APP_UNSPLASH_ACESSS_KEY;
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const LocationCard = ({ name,startingPoint,destination }) => {
  // console.log(name)
  const [imageUrl, setimageUrl] = useState();
  const [description, setDescription] = useState();

  const [wikidataId, setWikidataId] = useState("");
  const dispath=useDispatch()
  useEffect(() => {
    const fetchGeocodedResults = async () => {
      
      try {
        const response = await axios.get(
          `https://api.mapbox.com/search/geocode/v6/forward?q=${name}&types=street%2Clocality%2Cplace%2Cregion%2Cdistrict&language=en&access_token=${mapboxToken}`
        );
        // console.log(response)
          console.log(response.data.features)
        
         var wikiId = response.data.features[0]?.properties?.context?.place?.wikidata_id || "";
         if(!wikiId){
          wikiId=response.data.features[0]?.properties?.context?.region?.wikidata_id || ""
         }
        setWikidataId(wikiId);
        // console.log('wikidata'+wikiId)
        const coords = response.data.features[0]?.properties?.coordinates || {};
       if(destination){
        dispath({
          type:'SET_DESTINATION',
          payload:coords
        })
       }
       else if(startingPoint){
        dispath({
          type:'SET_STARTING_POINT',
          payload:coords
        })
       }
        
        
        
        
      } catch (error) {
        // console.error("Error fetching geocoded suggestions:", error);
      }
    };

    const fetchImageForLocation = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?query=${name} landscape&client_id=${accessKey}`
        );
        // console.log(response)
        setimageUrl(response.data.urls.small);
      } catch (error) {
        console.error(`Error fetching image for ${name}:`, error);
        return null;
      }
    };

    fetchGeocodedResults();
    fetchImageForLocation();
  }, [name]);
  useEffect(() => {
   
    if (wikidataId) {
      const fetchDescription = async () => {
        try {
          const result = await axios.get(
            `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`
          );
          setDescription(
            result.data.entities[wikidataId].descriptions.en.value
          );
        } catch (error) {
          console.error("Error fetching description:", error);
        }
      };

      fetchDescription();
    }
  }, [wikidataId]);

  // console.log(coordinates)
  return (
    <div className="location-card">
      <img src={imageUrl} alt={name} className="location-image" />
      <div className="location-details">
        <h2>{name}</h2>
        {/* <p>{wikidataId}</p> */}
        <p>{description}</p>
        {/* <p>{coordinates.longitude}</p> */}
      </div>
    </div>
  );
};

export default LocationCard;
