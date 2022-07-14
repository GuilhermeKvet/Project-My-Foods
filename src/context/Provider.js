import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [foods, setFoods] = useState([]);
  // const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    const fetchApiFood = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setFoods(data.meals);
      console.log(data.meals);
    };
    fetchApiFood();
  }, []);

  return (
    <context.Provider value={ foods }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
