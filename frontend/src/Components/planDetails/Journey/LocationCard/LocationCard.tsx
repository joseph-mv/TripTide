import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./LocationCard.css";
import { ROUTES } from "../../../../routes";
import {
  getCoordinatesAndWikiID,
  getDestDescription,
  getDestImage,
} from "../../../../services/api/destinationServices";

interface LocationCardProps {
  name: string;
  dispatchType: "SET_DESTINATION" | "SET_STARTING_POINT";
}

const LocationCard: React.FC<LocationCardProps> = ({ name, dispatchType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const [description, setDescription] = useState();

  // fetch location's lng, lat , image and description
  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const { coords, wikiId } = await getCoordinatesAndWikiID(name);
        dispatch({
          type: dispatchType,
          payload: coords,
        });
        const response = await getDestDescription(wikiId);
        setDescription(response);
      } catch (error) {
        console.log("Error fetching geocoded suggestions:", error);
        if (error instanceof Error) {
          toast.error(name + " " + error.message);
        } else {
          toast.error(name + " An unexpected error occurred");
        }
        navigate(ROUTES.TRIP_PLAN);
      }
    };

    const fetchImageForLocation = async () => {
      const response = await getDestImage(name);
      setImageUrl(response);
    };

    fetchLocationDetails();
    fetchImageForLocation();
  }, [name, dispatchType]);

  return (
    <div className="location-card">
      <img src={imageUrl} alt={name} className="location-image" />
      <div className="location-details">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LocationCard;
