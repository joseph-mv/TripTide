import { useEffect, useState } from "react";
import "./Connections.css";
import { searchFriends } from "../../../services/friendsService";
import useDebounce from "../../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

type SearchUser = { _id: string; image?: string; name: string };

const Connections = () => {
  const [query, setQuery] = useState("");
  const userId = useSelector((state: RootState) => state.user.userId);
  const [searchList, setSearchList] = useState<SearchUser[]>([]);
  const debouncedQuery = useDebounce(query, 500);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSearch = async (q: string) => {
    const list = await searchFriends(q);
    setSearchList((list as SearchUser[]) || []);
  };

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

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
