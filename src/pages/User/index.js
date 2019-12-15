import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ModelsAdmin from '../ModelsAdmin';
import Header from '../../components/shared/Header/Header';
import LeftSideMenu from '../../components/shared/LeftSideMenu';
import UserHome from '../UserHome';

import styles from './user.module.scss';

const User = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.page}>
      <LeftSideMenu />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/user/home" component={UserHome} />
        </Switch>
      </div>
    </div>
  </div>
);

export default User;
