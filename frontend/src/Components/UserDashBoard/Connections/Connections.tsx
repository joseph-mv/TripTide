import React, { useEffect, useState } from "react";
import "./Connections.css";
import { searchFriends } from "../../../services/friendsService";
import useDebounce from "../../../hooks/useDebounce";
import {useSelector} from 'react-redux'
const Connections = () => {
  const [query, setQuery] = useState("");
  const userId=useSelector(store=>store.user.userId)
  const [searchList, setSearchList] = useState([]);
  const debouncedQuery = useDebounce(query, 500);
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  const onSearch = async () => {
    const list = await searchFriends(debouncedQuery);
    setSearchList(list);
  };

  return (
    <div className="content-section">
      <h2>Connections</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <button className="search-button">🔍</button>
      </div>
      <div className="user-list">
      
        {searchList.map((user) => (
          <div key={user._id} className="user-card">
            <img
              src={user.image || "/icons/profilePic.png"}
              alt={user.name}
              className="user-image"
            />
            <div>
            <p className="user-name">{user.name}</p>
            {(user._id===userId)? <p>you</p> :'' } 
            </div>
            
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
