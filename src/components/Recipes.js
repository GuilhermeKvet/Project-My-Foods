import React, { useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import context from '../context/context';

function Recipes() {
  const { foods, drinks, categoryName } = useContext(context);

  const history = useHistory();
  if (history.location.pathname.includes('/foods')) {
    if (categoryName === 'Goat' && foods.length === 1) {
      return (
        <button
          type="button"
          key={ foods[0].idMeal }
          onClick={ () => history.push(`/foods/${foods[0].idMeal}`) }
        >
          <div
            data-testid="0-recipe-card"
          >
            <h1 data-testid="0-card-name">{foods[0].strMeal}</h1>
            <img
              src={ foods[0].strMealThumb }
              alt={ foods[0].strMeal }
              data-testid="0-card-img"
              style={ { height: '200px' } }
            />
          </div>
        </button>
      );
    }
    return (
      foods.length > 0 && (
        foods.map((recipe, index) => {
          const { strMealThumb, idMeal, strMeal } = recipe;
          return (
            <div key={ idMeal }>
              {foods.length === 1 && <Redirect to={ `/foods/${idMeal}` } />}
              <button
                type="button"
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
