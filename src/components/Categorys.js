import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const FIVE = 5;

function Categorys({ url, category }) {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchApiCategorys = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const newData = data[category].slice(0, FIVE);
      setFilters(newData);
    };
    return fetchApiCategorys();
  }, [url, category]);

  return (
    <>
      <button type="button">All</button>
      {filters.map((filter) => {
        const { strCategory } = filter;
        return (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        );
      })}
    </>
  );
}

Categorys.propTypes = {
  url: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Categorys;
