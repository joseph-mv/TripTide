import React from "react";
import "./Suggestions.css";

function Suggestions(props) {

  const { suggestions, setSuggestions, formData, setFormData, place } = props;

  return (
    <div>
      <ul className="suggestions-list">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            onClick={(e) => {
        
              place
                ? setFormData({
                    ...formData,
                    destination: suggestion.properties.full_address,
                    desCoordinate: suggestion.properties.coordinates,
                  })
                : setFormData({
                    ...formData,
                    startingPoint: suggestion.properties.full_address,
                    stCoordinates: suggestion.properties.coordinates,
                  });
              setSuggestions([]);
            }}
          >
            {suggestion.properties.full_address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
