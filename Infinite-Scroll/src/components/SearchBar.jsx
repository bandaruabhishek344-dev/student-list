import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search recipes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default React.memo(SearchBar);