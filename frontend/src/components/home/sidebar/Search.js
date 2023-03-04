import React, { useState } from "react";
import SearchItem from "./SearchItem";
import { v4 as uuidv4 } from "uuid";

function Search() {
  const [recentSearches, setRecentSearches] = useState([""]);
  return (
    <div className="search overlay__item">
      <div className="search__header">
        <div className="top">
          <h2>Search</h2>
        </div>
        <div className="bottom">
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="recent__search">
        <div className="top">
          <h4>Recent</h4>
          {recentSearches.length ? (
            <h4 className="clear cursor__pointer">Clear All</h4>
          ) : (
            ""
          )}
        </div>
        <div
          className={`recent__searches ${
            recentSearches.length ? "not__empty" : "empty"
          }`}
        >
          {recentSearches.length ? (
            recentSearches.map((item) => {
              return <SearchItem key={uuidv4()} />;
            })
          ) : (
            <span>No recent searches.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
