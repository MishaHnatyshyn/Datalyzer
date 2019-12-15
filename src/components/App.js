import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import MainPopupsContainer from './MainPopupsContainer';
import {
  NotLoggedInRoute,
  ProtectedAdminRoute,
  ProtectedUserRoute,
} from './shared/ProtectedRoutes';
import {
  LOGIN_URL, ROOT_URL, USER_BASE_URL, ADMIN_BASE_URL
} from '../config/routing';
import Admin from '../pages/Admin';
import User from '../pages/User';


const App = () => (
  <div>
    <MainPopupsContainer />
    <Switch>
      <NotLoggedInRoute exact path={ROOT_URL} component={Login} />
      <NotLoggedInRoute exact path={LOGIN_URL} component={Login} />
      <ProtectedAdminRoute path={ADMIN_BASE_URL} component={Admin} />
      <ProtectedUserRoute path={USER_BASE_URL} component={User} />
    </Switch>
  </div>
);

export default App;
