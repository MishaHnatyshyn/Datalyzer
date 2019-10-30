import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import PopupExamples from './PopupExamples';

const App = () => (
  <div>
    <PopupExamples />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
    </Switch>
  </div>
);

export default App;
