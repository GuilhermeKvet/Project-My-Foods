import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
