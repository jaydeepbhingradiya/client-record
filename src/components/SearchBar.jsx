import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by ID, Name, or Email"
      onKeyUp={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
