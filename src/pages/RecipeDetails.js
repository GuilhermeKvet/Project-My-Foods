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
    console.log(recipe);
    return (
      <div>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          width="200px"
        />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <p data-testid="recipe-category">{strCategory}</p>

        <p data-testid="instructions">{strInstructions}</p>
      </div>
    );
  }

  return (
    <h3>teste</h3>
  );
}

export default RecipesDetails;
