import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  const history = useHistory();
  const [searchBarState, setSearchBarState] = useState(false);
  return (
    <header>
      <nav style={ { display: 'flex' } }>
        <button type="button" onClick={ () => history.push('/profile') }>
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
        <h1 data-testid="page-title">{title}</h1>
        <button type="button" onClick={ () => setSearchBarState(!searchBarState) }>
          <img
            src={ searchIcon }
            alt="search-icon"
            data-testid="search-top-btn"
          />
        </button>
      </nav>
      {searchBarState && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
