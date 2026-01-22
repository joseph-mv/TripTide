import { useRef } from "react";

import "./Suggestions.css";

interface Suggestion {
  properties: {
    full_address: string;
  };
}

interface SuggestionsProps {
  suggestions: Suggestion[];
  setSuggestions: (suggestions: Suggestion[]) => void;
  idx: number;
  handleMouseClick: (suggestions: Suggestion[], index: number) => void;
}

function Suggestions({ suggestions, setSuggestions, idx, handleMouseClick }: SuggestionsProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const highlightedItem = listRef.current?.children[idx] as HTMLElement;
  highlightedItem?.scrollIntoView({ behavior: "smooth", block: "nearest" });

  return (
    <div>
      <ul className="suggestions-list" ref={listRef}>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={index === idx ? "highlight" : ""}
            onClick={() => {
              handleMouseClick(suggestions, index)
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
