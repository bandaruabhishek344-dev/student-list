function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search Foods..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;