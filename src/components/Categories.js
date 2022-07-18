import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import context from '../context/context';

const FIVE = 5;
const TWELVE = 12;

function Categories({ url, category }) {
  const [filters, setFilters] = useState([]);
  const history = useHistory();
  const { setDrinks, setFoods, setCategoryName } = useContext(context);
  const [lastUrlFood, setLastUrlFood] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [lastUrlDrink, setLastUrlDrinks] = useState('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  useEffect(() => {
    const fetchApiCategorys = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const newData = data[category].slice(0, FIVE);
      setFilters(newData);
    };
    return fetchApiCategorys();
  }, [url, category]);

  const fetchCategories = async (urlCategory, page) => {
    if (page === 'drinks') {
      const response = await fetch(urlCategory);
      const data = await response.json();
      const newData = data.drinks.slice(0, TWELVE);
      setDrinks(newData);
    } else {
      const response = await fetch(urlCategory);
      const data = await response.json();
      const newData = data.meals.slice(0, TWELVE);
      setFoods(newData);
    }
  };

  const fetchDefault = async () => {
    const { pathname } = history.location;
    if (pathname === '/foods') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const newData = data.meals.slice(0, TWELVE);
      setFoods(newData);
    } else {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const newData = data.drinks.slice(0, TWELVE);
      setDrinks(newData);
    }
  };

  const filterCategory = (strCategory) => {
    setCategoryName(strCategory);
    const { pathname } = history.location;
    const fetchDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`;
    const fetchMeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`;
    if (pathname === '/drinks' && fetchDrinks !== lastUrlDrink) {
      fetchCategories(fetchDrinks, 'drinks');
      setLastUrlDrinks(fetchDrinks);
    } else if (fetchDrinks === lastUrlDrink) {
      fetchDefault();
      setLastUrlDrinks(fetchDrinks);
    } else if (fetchMeals !== lastUrlFood) {
      fetchCategories(fetchMeals, 'foods');
      setLastUrlFood(fetchMeals);
    } else {
      fetchDefault();
      setLastUrlFood(fetchMeals);
    }
  };

  return (
    <>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => fetchDefault() }
      >
        All
      </button>
      {filters.map((filter) => {
        const { strCategory } = filter;
        return (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => filterCategory(strCategory) }
          >
            {strCategory}
          </button>
        );
      })}
    </>
  );
}

Categories.propTypes = {
  url: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Categories;
