import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import context from './context';

const TWELVE = 12;

const error = 'Sorry, we haven\'t found any recipes for these filters.';

function Provider({ children }) {
  const [obj, setObj] = useState({
    meals: {},
    cocktails: {},
  });
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filters, setFilters] = useState({ filter: '', search: '' });
  const [url, setUrl] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [urlDrink, setUrlDrink] = useState('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const [categoryName, setCategoryName] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    } else {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(obj));
    }
  }, [obj, id, pathname]);

  useEffect(() => {
    const fetchApiFood = async () => {
      const response = await fetch(url);
      const data = await response.json();
      if (data.meals === null) {
        global.alert(error);
        return null;
      }
      const foodList = data.meals.slice(0, TWELVE);
      setFoods(foodList);
    };
    fetchApiFood();
  }, [url]);

  useEffect(() => {
    const fetchApiDrink = async () => {
      try {
        const response = await fetch(urlDrink);
        const data = await response.json();
        if (data.drinks === null) {
          global.alert(error);
          return null;
        }
        const drinkList = data.drinks.slice(0, TWELVE);
        setDrinks(drinkList);
      } catch {
        global.alert(error);
      }
    };
    fetchApiDrink();
  }, [urlDrink]);

  useEffect(() => {
    const fetchAPIFilters = () => {
      if (pathname === '/foods' && filters.search === 'chicken') {
        return setUrl('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
      }
      switch (filters.filter) {
      case 'Ingredient':
        return pathname === '/drinks'
          ? setUrlDrink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.search}`)
          : setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filters.search}`);
      case 'Name':
        return pathname === '/drinks'
          ? setUrlDrink(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filters.search}`)
          : setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filters.search}`);
      case 'First Letter':
        return pathname === '/drinks'
          ? setUrlDrink(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filters.search}`)
          : setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filters.search}`);
      default:
        return null;
      }
    };
    fetchAPIFilters();
  }, [filters, pathname]);

  return (
    <context.Provider
      value={ { foods,
        setFilters,
        drinks,
        setDrinks,
        setFoods,
        setCategoryName,
        categoryName,
        obj,
        setObj,
      } }
    >
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
