import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import { ProtectedAdminRoute, ProtectedUserRoute } from './shared/ProtectedRoutes';
import {
  ADMIN_HOME_URL, LOGIN_URL, ROOT_URL, USER_HOME_URL
} from '../config/routing';

const App = () => (
  <div>
    <Switch>
      <Route exact path={ROOT_URL} component={Login} />
      <Route path={LOGIN_URL} component={Login} />
      <ProtectedAdminRoute path={ADMIN_HOME_URL} component={() => <div>ADMIN PAGE</div>} />
      <ProtectedUserRoute path={USER_HOME_URL} component={() => <div>USER PAGE</div>} />
    </Switch>
  </div>
);


export default App;
