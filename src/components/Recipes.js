import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';

function Recipes() {
  const { foods, drinks } = useContext(context);
  const history = useHistory();
  if (history.location.pathname === '/foods') {
    return (
      foods.length > 0 && (
        foods.map((recipe, index) => {
          const { strMealThumb, idMeal, strMeal } = recipe;
          return (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ idMeal }
            >
              <h1 data-testid={ `${index}-card-name` }>{strMeal}</h1>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
                style={ { height: '200px' } }
              />
            </div>
          );
        })
      )
    );
  }
  return (
    drinks.length > 0 && (
      drinks.map((recipe, index) => {
        const { strDrinkThumb, idDrink, strDrink } = recipe;
        return (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idDrink }
          >
            <h1 data-testid={ `${index}-card-name` }>{strDrink}</h1>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
              style={ { height: '200px' } }
            />
          </div>
        );
      })
    )
  );
}

export default Recipes;
