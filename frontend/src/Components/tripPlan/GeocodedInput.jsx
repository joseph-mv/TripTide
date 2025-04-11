import React, { useState } from "react";

import Suggestions from "./Suggestions/Suggestions";
import { getGeocodedSuggestions } from "../../services/api/destinationServices";

/**
 * GeocodedInput
 * Typically used for address or location input fields where location-based suggestions or processing are needed.
 * 
 * @param {Object} props - The props for the component.
 * @param {function} props.handleChange - Callback function to handle input changes.
 * @param {string} props.name - Name attribute for the input, useful for form identification.
 * @param {function} props.keyEnter - Callback function triggered on Enter key press.
 * @param {...any} props - Additional props passed down to the input element.
 * 
 * @returns {JSX.Element} A geocoded text input component.
 */
const GeocodedInput = ({ handleChange, name, keyEnter, ...props }) => {
  const [sugIdx, setSugIdx] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);

  // fetch suggestions form mapbox
  const fetchGeocodedResults = async (e) => {
    const response = await getGeocodedSuggestions(e.target.value);
    setSuggestions(response);
  };

  //key actions
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSugIdx((pre) => (pre + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSugIdx((pre) => (pre + suggestions.length - 1) % suggestions.length);
    } else if (e.key === "Enter" && sugIdx >= 0) {
      e.preventDefault();
      keyEnter(suggestions, sugIdx);

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
      {/* suggestions */}
      {suggestions.length > 0 && (
        <Suggestions
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          idx={sugIdx}
          handleMouseClick={keyEnter}
        />
      )}
    </>
  );
};

export default GeocodedInput;
