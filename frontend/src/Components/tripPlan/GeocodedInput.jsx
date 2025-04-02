import React, { useState } from "react";
import { getGeocodedSuggestions } from "../../services/api/destinationServices";
import Suggestions from "./Suggetions/Suggestions";
import { useDispatch } from "react-redux";

const GeocodedInput = ({ handleChange, name, ...props }) => {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]); //for Destination input
  const [sugIdx, setSugIdx] = useState(-1);

  const fetchGeocodedResults = async (e) => {
    const response = await getGeocodedSuggestions(e.target.value);
    setSuggestions(response);
  };

  const handleKeyDown = (e) => {

    if (e.key === "ArrowDown") {

      setSugIdx((pre) => (pre + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSugIdx((pre) => (pre + suggestions.length - 1) % suggestions.length);
    } else if (e.key === "Enter") {
        e.preventDefault()
      if (e.target.id === "destination" && sugIdx >= 0) {
        dispatch({
          type: "DESTINATION_SUGGESTION",
          payload: suggestions[sugIdx].properties,
        });
      } else if (e.target.id === "startingPoint" && sugIdx >= 0) {
        dispatch({
          type: "STARTING_SUGGESTION",
          payload: suggestions[sugIdx].properties,
        });
      }
      setSuggestions([]);
      setSugIdx(-1);
    }
  };

  return (
    <>
      <input
        type="text"
        name={name}
        onChange={(e) => {
          fetchGeocodedResults(e);
          handleChange(e);
        }}
        onKeyDown={handleKeyDown}
        required
        {...props}
      />
      {suggestions.length > 0 &&  (
        <Suggestions
          suggestions={suggestions}
          setSuggestions={setSuggestions}
            destination={name}
          idx={sugIdx}
        />
      )}
    </>
  );
};

export default GeocodedInput;
