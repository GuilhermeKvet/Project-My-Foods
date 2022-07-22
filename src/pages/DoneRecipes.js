import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const THREE_MILLISECONDS = 3000;

function DoneRecipes() {
  const [recipeFinished, setRecipeFinished] = useState([]);
  const [isShare, setIsShare] = useState(false);

  useEffect(() => {
    const finished = JSON.parse(localStorage.getItem('doneRecipes'));
    if (finished) {
      setRecipeFinished(finished);
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

  return (
    <>
      <Header title="Done Recipes" isSearch={ false } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Foods</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {recipeFinished.length > 0 && (
        recipeFinished.map((recipe, index) => {
          const { category, name, image, doneDate, tags } = recipe;
          return (
            <div key={ `${index}-${name}` }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
                width="200px"
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
              <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
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
