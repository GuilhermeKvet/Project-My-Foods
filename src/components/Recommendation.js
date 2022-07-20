import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const SIX = 6;

function Recommendation() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const carousel = useRef(null);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  useEffect(() => {
    const fetchAPI = async () => {
      if (history.location.pathname.includes('/drinks')) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals.slice(0, SIX));
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.drinks.slice(0, SIX));
      }
    };
    fetchAPI();
  }, [history]);

  if (history.location.pathname.includes('/drinks')) {
    return (
      <div>
        <h2>Recommendations</h2>
        <div
          style={ { display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth' } }
          ref={ carousel }
        >
          {recipes.length > 0 && (
            recipes.map((recipe, index) => (
              <div key={ recipe.idMeal } data-testid={ `${index}-recomendation-card` }>
                <img src={ recipe.strMealThumb } alt={ recipe.strMeal } width="165" />
                <p data-testid={ `${index}-recomendation-title` }>{recipe.strMeal}</p>
              </div>
            ))
          )}
        </div>
        <div style={ { display: 'flex', justifyContent: 'center', gap: '2px' } }>
          <button type="button" onClick={ handleLeftClick }>Left</button>
          <button type="button" onClick={ handleRightClick }>Right</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div
        style={ { display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
        } }
        ref={ carousel }
      >
        {recipes.length > 0 && (
          recipes.map((recipe, index) => (
            <div key={ recipe.idDrink } data-testid={ `${index}-recomendation-card` }>
              <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } width="165" />
              <p data-testid={ `${index}-recomendation-title` }>{recipe.strDrink}</p>
            </div>
          ))
        )}
      </div>
      <div style={ { display: 'flex', justifyContent: 'center', gap: '2px' } }>
        <button type="button" onClick={ handleLeftClick }>Left</button>
        <button type="button" onClick={ handleRightClick }>Right</button>
      </div>
    </div>
  );
}

export default Recommendation;
