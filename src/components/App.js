import React from 'react';
import { Switch } from 'react-router-dom';
import newUser from '../pages/page';
import { NotLoggedInRoute, ProtectedAdminRoute, ProtectedUserRoute } from './shared/ProtectedRoutes';
import {
  LOGIN_URL, ROOT_URL, USER_HOME_URL, ADMIN_BASE_URL
} from '../config/routing';
import Admin from '../pages/Admin';

const App = () => (
  
  <div>
    <Switch>
      <NotLoggedInRoute exact path={ROOT_URL} component={newUser} />
      <NotLoggedInRoute exact path={LOGIN_URL} component={newUser} />
      <ProtectedAdminRoute path={ADMIN_BASE_URL} component={newUser} />
      <ProtectedUserRoute path={USER_HOME_URL} component={() => <div>USER PAGE</div>} />
    </Switch>
  </div>
);

export default App;
