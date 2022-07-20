import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import InteractionButtons from '../components/InteractionButtons';
import context from '../context/context';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const { obj } = useContext(context);
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];

  const saveProgress = (ing, page) => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progress[page][id]) {
      const newObj = {
        ...obj,
        [page]: {
          [id]: [...progress[page][id], ing],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    } else {
      console.log('entrou');
      const newObj = {
        ...progress,
        [page]: {
          [id]: [ing],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
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
    const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipe;

    const listRecipe = Object.entries(recipe);
    const listAllIngredients = listRecipe
      .filter((arr) => arr[0].includes('strIngredient'));
    const listIngredients = listAllIngredients.filter((arr) => arr[1]);
    const ingredients = listIngredients.reduce((acc, arr) => {
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
        <InteractionButtons recipe={ recipe } />
        <p data-testid="recipe-category">{strAlcoholic}</p>
        <div style={ { display: 'flex', flexDirection: 'column' } }>
          {ingredients.map((ingredient, index) => (
            <label
              key={ ingredient }
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
              onChange={ () => saveProgress(ingredient, 'cocktails') }
            >
              <input
                type="checkbox"
                name={ ingredient }
                id={ ingredient }
              />
              {ingredient}
            </label>
          ))}
        </div>
        <p data-testid="instructions">{strInstructions}</p>
        <footer
          style={ { position: 'fixed', width: '100%', bottom: 0 } }
        >
          <button type="button" data-testid="finish-recipe-btn">
            Finish Recipe
          </button>
        </footer>
      </div>
    );
  }

  const { strMealThumb, strMeal, strCategory, strInstructions } = recipe;
  const listRecipe = Object.entries(recipe);
  const listAllIngredients = listRecipe
    .filter((arr) => arr[0].includes('strIngredient'));
  const listIngredients = listAllIngredients.filter((arr) => arr[1]);
  const ingredients = listIngredients.reduce((acc, arr) => {
    acc = [...acc, arr[1]];
    return acc;
  }, []);

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        width="200px"
      />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <InteractionButtons recipe={ recipe } />
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <div style={ { display: 'flex', flexDirection: 'column' } }>
        {ingredients.map((ingredient, index) => (
          <label
            key={ ingredient }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            onChange={ () => saveProgress(ingredient, 'meals') }
          >
            <input type="checkbox" name={ ingredient } id={ ingredient } />
            {ingredient}
          </label>
        ))}
      </div>
      <p data-testid="instructions">{strInstructions}</p>
      <footer
        style={ { position: 'fixed', width: '100%', bottom: 0 } }
      >
        <button type="button" data-testid="finish-recipe-btn">
          Finish Recipe
        </button>
      </footer>
    </div>
  );
}

export default RecipeInProgress;
