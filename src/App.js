import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route path="/profile" component={ Profile } />
      <Route path="/foods" component={ Foods } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
