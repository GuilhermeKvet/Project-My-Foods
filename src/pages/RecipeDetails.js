import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Recommendation from '../components/Recommendation';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const THREE_MILLISECONDS = 3000;

function RecipesDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];
  const [recipe, setRecipe] = useState({});
  const [isShare, setIsShare] = useState(false);

  const copyLink = () => {
    copy(window.location.href);
    setIsShare(true);
    setTimeout(() => setIsShare(false), THREE_MILLISECONDS);
  };

  useEffect(() => {
    const fetchApiById = async () => {
      if (pathname.includes('/drinks')) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.drinks[0]);
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
      }
    };
    fetchApiById();
  }, [id, pathname, setRecipe]);

  if (pathname.includes('/drinks')) {
    const { strDrinkThumb, strDrink,
      strInstructions, strAlcoholic } = recipe;
    const listRecipe = Object.entries(recipe);
    const listAllIngredients = listRecipe
      .filter((arr) => arr[0].includes('strIngredient'));
    const listIngredients = listAllIngredients.filter((arr) => arr[1]);
    const ingredients = listIngredients.reduce((acc, arr) => {
      acc = [...acc, arr[1]];
      return acc;
    }, []);

    const listAllMeasure = listRecipe
      .filter((arr) => arr[0].includes('strMeasure'));
    const listMeasure = listAllMeasure.filter((arr) => arr[1]);
    const measures = listMeasure.reduce((acc, arr) => {
      acc = [...acc, arr[1]];
      return acc;
    }, []);

    return (
      <div>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          width="200px"
        />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyLink }
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        {isShare && <span>Link copied!</span>}
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
        </button>
        <p data-testid="recipe-category">{strAlcoholic}</p>
        {ingredients.map((ingredient, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            {`${ingredient}  ${measures[index] === undefined
              ? '' : `- ${measures[index]}`}`}
          </p>
        ))}
        <p data-testid="instructions">{strInstructions}</p>
        <Recommendation />
      </div>
    );
  }

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipe;
  const listRecipe = Object.entries(recipe);
  const listAllIngredients = listRecipe
    .filter((arr) => arr[0].includes('strIngredient'));
  const listIngredients = listAllIngredients.filter((arr) => arr[1]);
  const ingredients = listIngredients.reduce((acc, arr) => {
    acc = [...acc, arr[1]];
    return acc;
  }, []);

  const listAllMeasure = listRecipe
    .filter((arr) => arr[0].includes('strMeasure'));
  const listMeasure = listAllMeasure.filter((arr) => arr[1]);
  const measures = listMeasure.reduce((acc, arr) => {
    acc = [...acc, arr[1]];
    return acc;
  }, []);

  const linkYoutube = strYoutube?.replace('watch?v=', 'embed/');

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        width="200px"
      />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLink }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {isShare && <span>Link copied!</span>}
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
      <h3 data-testid="recipe-category">{strCategory}</h3>
      {ingredients.map((ingredient, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ ingredient }
        >
          {`${ingredient}  ${measures[index] === undefined
            ? '' : `- ${measures[index]}`}`}
        </p>
      ))}
      <iframe
        data-testid="video"
        width="360"
        height="315"
        src={ linkYoutube }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
         autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <p data-testid="instructions">{strInstructions}</p>
      <Recommendation />
    </div>
  );
}

export default RecipesDetails;
