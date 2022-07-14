import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/profile" component={ Profile } />
        <Route path="/foods" component={ Foods } />
        <Route path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
