import React from "react";
import "./Suggestions.css";
import { useDispatch } from "react-redux";

function Suggestions(props) {

  const { suggestions, setSuggestions, place } = props;
  // console.log(formData)
  const dispatch=useDispatch()

  return (
    <div>
      <ul className="suggestions-list">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            onClick={(e) => {

              place ? dispatch({type:"DESTINATION_SUGGETION",payload:suggestion.properties}):dispatch({type:'STARTING_SUGGETION',payload:suggestion.properties})

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
