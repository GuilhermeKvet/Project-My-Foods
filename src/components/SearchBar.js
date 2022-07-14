import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="searchBar">
        <input
          id="searchBar"
          type="text"
          placeholder="Search..."
          data-testid="search-input"
        />
      </label>
    </div>
  );
}

export default SearchBar;
