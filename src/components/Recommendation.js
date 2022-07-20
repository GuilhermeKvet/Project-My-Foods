import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const SIX = 6;

function Recommendation() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [twoRecipes, setTwoRecipes] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      if (history.location.pathname.includes('/drinks')) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals.slice(0, SIX));
        setTwoRecipes(data.meals.slice(0, 2));
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.drinks.slice(0, SIX));
        setTwoRecipes(data.drinks.slice(0, 2));
      }
    };
    fetchAPI();
  }, [history]);

  if (history.location.pathname.includes('/drinks')) {
    return (
      <div>
        <h2>Recommendations</h2>
        <div style={ { display: 'flex', gap: '1rem' } }>
          {recipes.length > 0 && (
            recipes.map((recipe, index) => (
              <div key={ recipe.idMeal } data-testid={ `${index}-recomendation-card` }>
                <img src={ recipe.strMealThumb } alt={ recipe.strMeal } width="150px" />
                <p>{recipe.strMeal}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div style={ { display: 'flex' } }>
        {recipes.length > 0 && (
          twoRecipes.map((recipe, index) => (
            <div key={ recipe.idDrink } data-testid={ `${index}-recomendation-card` }>
              <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } width="200px" />
              <p>{recipe.strDrink}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Recommendation;
