import React, { useState } from "react";

import Suggestions from "./Suggestions/Suggestions";
import { getGeocodedSuggestions } from "../../services/api/destinationServices";

interface Suggestion {
  properties: {
    full_address: string;
  };
  geometry: {
    coordinates: number[];
  }
}

interface GeocodedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  keyEnter: (suggestions: Suggestion[], index: number) => void;
}

const GeocodedInput: React.FC<GeocodedInputProps> = ({ handleChange, name, keyEnter, ...props }) => {
  const [sugIdx, setSugIdx] = useState(-1);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // fetch suggestions form mapbox
  const fetchGeocodedResults = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const response = await getGeocodedSuggestions(e.target.value);
    setSuggestions(response);
  };

  //key actions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
