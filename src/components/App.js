import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
    </Switch>
  </div>
);

export default App;
