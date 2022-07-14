import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Foods from './pages/Foods';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/foods" component={ Foods } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
