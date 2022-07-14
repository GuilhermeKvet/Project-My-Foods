import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component, { historyPath = '/' } = {}) => {
  const history = createMemoryHistory();
  history.push(historyPath)
  return {
    ...render(<Router history={ history } ><Provider store={store}>{component}</Provider></Router>),
    history,
  }
}

export default renderWithRouter;
