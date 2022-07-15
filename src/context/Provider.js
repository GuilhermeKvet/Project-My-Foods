import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import context from './context';

const TWELVE = 12;

const error = 'Sorry, we haven\'t found any recipes for these filters.';

function Provider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filters, setFilters] = useState({ filter: '', search: '' });
  const [url, setUrl] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [urlDrink, setUrlDrink] = useState('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const history = useHistory();

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
      const response = await fetch(urlDrink);
      const data = await response.json();
      if (data.drinks === null) {
        global.alert(error);
        return null;
      }
      const drinkList = data.drinks.slice(0, TWELVE);
      setDrinks(drinkList);
    };
    fetchApiDrink();
  }, [urlDrink]);

  useEffect(() => {
    const fetchAPIFilters = () => {
      if (history.location.pathname === '/drinks') {
        switch (filters.filter) {
        case 'Ingredient':
          setUrlDrink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.search}`);
          break;
        case 'Name':
          setUrlDrink(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filters.search}`);
          break;
        case 'First Letter':
          setUrlDrink(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filters.search}`);
          break;
        default:
          return null;
        }
      } else {
        switch (filters.filter) {
        case 'Ingredient':
          if (filters.search === 'chicken') {
            setUrl('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
            break;
          }
          setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filters.search}`);
          break;
        case 'Name':
          setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filters.search}`);
          break;
        case 'First Letter':
          setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filters.search}`);
          break;
        default:
          return null;
        }
      }
    };
    fetchAPIFilters();
  }, [filters, history]);

  return (
    <context.Provider value={ { foods, setFilters, drinks } }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
