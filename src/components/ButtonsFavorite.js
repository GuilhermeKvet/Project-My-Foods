import React, { useState } from 'react';
import copy from 'clipboard-copy';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const THREE_MILLISECONDS = 3000;

function ButtonsFavorite({ recipe, index, setAttList }) {
  const [isShare, setIsShare] = useState(false);

  const copyLink = (recipeReceived) => {
    const { id, type } = recipeReceived;
    const linkURL = window.location.href;
    const newLinkURL = linkURL.replace('/favorite-recipes', `/${type}s/${id}`);
    copy(newLinkURL);
    setIsShare(true);
    setTimeout(() => setIsShare(false), THREE_MILLISECONDS);
  };

  const removeFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favorites.filter((rec) => rec.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setAttList(recipe.id);
  };

  return (
    <>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyLink(recipe) }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {isShare && <span>Link copied!</span>}
      <button
        type="button"
        onClick={ removeFavorite }
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
      >
        <img src={ blackHeartIcon } alt="heartIcon" />
      </button>
    </>
  );
}

ButtonsFavorite.propTypes = {
  recipe: propTypes.objectOf(propTypes.any).isRequired,
  index: propTypes.number.isRequired,
  setAttList: propTypes.func.isRequired,
};

export default ButtonsFavorite;
