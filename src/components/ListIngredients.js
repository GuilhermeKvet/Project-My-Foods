import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ListIngredients({ recipe, setIsFinish }) {
  const history = useHistory();
  const { pathname } = history.location;
  const [ingredients, setIngredients] = useState([]);
  const id = pathname.split('/')[2];
  const page = pathname.includes('drinks') ? 'cocktails' : 'meals';

  const checkBox = () => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const listIngredientsLocal = recipesInProgress[page][id];
    listIngredientsLocal.forEach((ing) => {
      if (document.getElementById(ing)) {
        document.getElementById(ing).setAttribute('checked', true);
      }
    });
  };

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (pathname.includes('drinks') && recipesInProgress?.cocktails[id]) {
      checkBox();
    }
    if (recipesInProgress?.meals[id]) {
      checkBox();
    }
  });

  useEffect(() => {
    const listRecipe = Object.entries(recipe);
    const listAllIngredients = listRecipe
      .filter((arr) => arr[0].includes('strIngredient'));
    const listIngredients = listAllIngredients.filter((arr) => arr[1]);
    const allIngredients = listIngredients.reduce((acc, arr) => {
      acc = [...acc, arr[1]];
      return acc;
    }, []);
    setIngredients(allIngredients);
  }, [recipe]);

  const markedIngredients = () => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    ingredients.forEach((_ing, index) => {
      if (ingredients.some((i) => i === recipesInProgress[page][id][index])) {
        setIsFinish(false);
      } else {
        setIsFinish(true);
      }
    });
  };

  const saveProgress = (ing) => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress[page][id]) {
      const isSaveIngredient = recipesInProgress[page][id].some((i) => i === ing);
      if (isSaveIngredient) {
        const newRecipesInProgress = {
          ...recipesInProgress,
          [page]: {
            ...recipesInProgress[page],
            [id]: recipesInProgress[page][id].filter((i) => i !== ing),
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProgress));
        markedIngredients();
      } else {
        const newRecipesInProgress = {
          ...recipesInProgress,
          [page]: {
            ...recipesInProgress[page],
            [id]: [...recipesInProgress[page][id], ing],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProgress));
        markedIngredients();
      }
    } else {
      const newRecipesInProgress = {
        ...recipesInProgress,
        [page]: {
          ...recipesInProgress[page],
          [id]: [ing],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProgress));
      markedIngredients();
    }
  };

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      {ingredients.map((ingredient, index) => (
        <label
          key={ `${index}-ingredient` }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          onChange={ () => saveProgress(ingredient) }
        >
          <input
            type="checkbox"
            name={ ingredient }
            id={ ingredient }
            value={ ingredient }
          />
          {ingredient}
        </label>
      ))}
    </div>
  );
}

ListIngredients.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  setIsFinish: propTypes.func.isRequired,
};

export default ListIngredients;
