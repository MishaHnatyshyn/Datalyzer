import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './admin.module.scss';
import ModelsAdmin from '../ModelsAdmin';
import Header from '../../components/shared/Header/Header';
import LeftSideMenu from '../../components/shared/LeftSideMenu';
import HomeAdmin from '../HomeAdmin';
import DatabasesAdmin from '../DatabasesAdmin';
import UsersAdmin from '../UsersAdmin';

const Admin = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.page}>
      <LeftSideMenu />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/admin/home" component={HomeAdmin} />
          <Route exact path="/admin/models" component={ModelsAdmin} />
          <Route exact path="/admin/databases" component={DatabasesAdmin} />
          <Route exact path="/admin/users" component={UsersAdmin} />
        </Switch>
      </div>
    </div>

  </div>
);

export default Admin;
