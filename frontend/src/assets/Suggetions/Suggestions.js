import React, { useRef } from "react";
import "./Suggestions.css";
import { useDispatch } from "react-redux";

function Suggestions(props) {
  
  const listRef = useRef(null);
  
  const { suggestions, setSuggestions, place,idx } = props;
  const highlightedItem=listRef.current?.children[idx]
  highlightedItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  // console.log(suggestions)
  // console.log(formData)
  // console.log(index)
  const dispatch=useDispatch()

  return (
    <div>
      <ul className="suggestions-list" ref={listRef}>
        {suggestions.map((suggestion,index) => (
          <li
            key={index}
            className={index===idx?'highlight':''}
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
