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

      <label htmlFor="radioIndredients">
        <input
          id="radioIndredients"
          name="search"
          type="radio"
          data-testid="ingredient-search-radio"
        />
        Ingredients
      </label>

      <label htmlFor="radioName">
        <input
          id="radioName"
          type="radio"
          name="search"
          data-testid="name-search-radio"
        />
        Name
      </label>

      <label htmlFor="radioFisrt">
        <input
          type="radio"
          name="search"
          id="radioFisrt"
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>

      <button type="button" data-testid="exec-search-btn">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
