import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';

function Recipes() {
  const { foods, drinks } = useContext(context);
  const history = useHistory();
  if (history.location.pathname.includes('/foods')) {
    return (
      foods.length > 0 && (
        foods.map((recipe, index) => {
          const { strMealThumb, idMeal, strMeal } = recipe;
          return foods.length === 1 ? history.push(`/foods/${idMeal}`) : (
            <button
              type="button"
              key={ idMeal }
              onClick={ () => history.push(`/foods/${idMeal}`) }
            >
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <h1 data-testid={ `${index}-card-name` }>{strMeal}</h1>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                  style={ { height: '200px' } }
                />
              </div>
            </button>
          );
        })
      )
    );
  }
  return (
    drinks.length > 0 && (
      drinks.map((recipe, index) => {
        const { strDrinkThumb, idDrink, strDrink } = recipe;
        return drinks.length === 1 ? history.push(`/drinks/${idDrink}`) : (
          <button
            type="button"
            key={ idDrink }
            onClick={ () => history.push(`/drinks/${idDrink}`) }
          >
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <h1 data-testid={ `${index}-card-name` }>{strDrink}</h1>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
                style={ { height: '200px' } }
              />
            </div>
          </button>
        );
      })
    )
  );
}

export default Recipes;
