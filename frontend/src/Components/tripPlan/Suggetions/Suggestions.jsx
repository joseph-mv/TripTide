import React, { useRef } from "react";
import "./Suggestions.css";
import { useDispatch } from "react-redux";

function Suggestions({ suggestions, setSuggestions, destination, idx }) {
  const listRef = useRef(null);

  const highlightedItem = listRef.current?.children[idx];
  highlightedItem?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  const dispatch = useDispatch();

  return (
    <div>
      <ul className="suggestions-list" ref={listRef}>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={index === idx ? "highlight" : ""}
            onClick={(e) => {
              destination
                ? dispatch({
                    type: "DESTINATION_SUGGESTION",
                    payload: suggestion.properties,
                  })
                : dispatch({
                    type: "STARTING_SUGGESTION",
                    payload: suggestion.properties,
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
