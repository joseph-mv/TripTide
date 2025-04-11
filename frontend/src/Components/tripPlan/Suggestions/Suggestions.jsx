import React, { useRef } from "react";

import "./Suggestions.css";

/**
 * Suggestions - A component that renders a list of suggestion items, typically used for autocomplete or geocoding UI.
 *
 * 
 * @param {Object} props - The props for the component.
 * @param {Array<Object>} props.suggestions - The list of suggestion items to display.
 * @param {function} props.setSuggestions - Function to update the suggestions list .
 * @param {number} props.idx - The index of the currently highlighted suggestion .
 * @param {function} props.handleMouseClick - Callback when a suggestion is clicked by the user.
 * 
 * @returns {JSX.Element} A rendered list of suggestion elements.
 */
function Suggestions({ suggestions, setSuggestions, idx,handleMouseClick }) {
  const listRef = useRef(null);

  const highlightedItem = listRef.current?.children[idx];
  highlightedItem?.scrollIntoView({ behavior: "smooth", block: "nearest" });

  return (
    <div>
      <ul className="suggestions-list" ref={listRef}>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={index === idx ? "highlight" : ""}
            onClick={(e) => {
              handleMouseClick(suggestions,index)
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
