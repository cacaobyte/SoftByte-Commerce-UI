const SearchBar = ({ search, setSearch, placeholder }) => (
    <input
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Buscar artículos"
    />
  );
  
  export default SearchBar;
  