import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function RecipesDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];
  const [recipe, setRecipe] = useState({});

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
    const { strDrinkThumb, strDrink, strCategory, strInstructions } = recipe;
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
        <h3 data-testid="instructions">{strInstructions}</h3>
      </div>
    );
  }
  return (
    <h3>Detalhes refeições</h3>
  );
}

export default RecipesDetails;
