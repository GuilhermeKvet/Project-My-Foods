import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const THREE_MILLISECONDS = 3000;

function DoneRecipes() {
  const [recipeFinished, setRecipeFinished] = useState([]);
  const [allRecipesFinished, setAllRecipesFinished] = useState([]);
  const [isShare, setIsShare] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const finished = JSON.parse(localStorage.getItem('doneRecipes'));
    if (finished) {
      setRecipeFinished(finished);
      setAllRecipesFinished(finished);
    }
  }, [setRecipeFinished]);

  const copyLink = (recipe) => {
    const { id, type } = recipe;
    const linkURL = window.location.href;
    const newLinkURL = linkURL.replace('/done-recipes', `/${type}s/${id}`);
    copy(newLinkURL);
    setIsShare(true);
    setTimeout(() => setIsShare(false), THREE_MILLISECONDS);
  };

  const filter = (fil) => {
    if (fil === 'drinks') {
      const newList = allRecipesFinished.filter((recipe) => recipe.type === 'drink');
      setRecipeFinished(newList);
    } else if (fil === 'foods') {
      const newList = allRecipesFinished.filter((recipe) => recipe.type === 'food');
      setRecipeFinished(newList);
    } else {
      setRecipeFinished(allRecipesFinished);
    }
  };

  return (
    <>
      <Header title="Done Recipes" isSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filter('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filter('foods') }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filter('drinks') }
      >
        Drinks
      </button>
      {recipeFinished.length > 0 && (
        recipeFinished.map((recipe, index) => {
          const { id, category, name, image, doneDate, tags,
            nationality, type, alcoholicOrNot } = recipe;
          return (
            <div key={ `${index}-${name}` }>
              <button
                onClick={ () => {
                  if (type === 'drink') {
                    history.push(`/drinks/${id}`);
                  } else {
                    history.push(`/foods/${id}`);
                  }
                } }
                type="button"
              >
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                  width="200px"
                />
                <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
              </button>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}`}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
              {tags.map((tag, inx) => (
                <p
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ `${name}-${inx}` }
                >
                  {tag}
                </p>
              ))}
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copyLink(recipe) }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {isShare && <span>Link copied!</span>}
            </div>
          );
        })
      )}
    </>
  );
}

export default DoneRecipes;
