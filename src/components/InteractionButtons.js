import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const THREE_MILLISECONDS = 3000;

function InteractionButtons({ recipe }) {
  const history = useHistory();
  const { pathname } = history.location;
  const [isShare, setIsShare] = useState(false);
  const [isFave, setIsFave] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (pathname.includes('/drinks') && favorites) {
      const isFavorite = favorites.some((favorite) => favorite.id === recipe.idDrink);
      if (isFavorite) setIsFave(true);
    } else if (favorites) {
      const isFavorite = favorites.some((favorite) => favorite.id === recipe.idMeal);
      if (isFavorite) setIsFave(true);
    }
  }, [pathname, recipe.idDrink, recipe.idMeal]);

  const setFavorites = (idRecipe, save) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      const isFavorite = favorites.some((favorite) => favorite.id === idRecipe);
      if (isFavorite) {
        setIsFave(false);
        const newFavorites = favorites.filter((favorite) => favorite.id !== idRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      } else {
        setIsFave(true);
        const newFavorites = [...favorites, save];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      }
    } else {
      setIsFave(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([save]));
    }
  };

  const saveRecipe = () => {
    if (pathname.includes('/drinks')) {
      const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = recipe;
      const save = {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      setFavorites(idDrink, save);
    } else {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;
      const save = {
        id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      setFavorites(idMeal, save);
    }
  };

  const copyLink = () => {
    copy(window.location.href);
    setIsShare(true);
    setTimeout(() => setIsShare(false), THREE_MILLISECONDS);
  };

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLink }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {isShare && <span>Link copied!</span>}
      <button type="button" onClick={ saveRecipe }>
        <img
          src={ isFave ? blackHeartIcon : whiteHeartIcon }
          alt="heartIcon"
          data-testid="favorite-btn"
        />
      </button>
    </>
  );
}

InteractionButtons.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
};

export default InteractionButtons;
