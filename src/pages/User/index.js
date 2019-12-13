import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../../components/shared/Layout';

const blocks = [
  {
    link: '/user/home',
    image: '/images/leftMenu/user/bars.png',
    alt: 'dashboards'
  },
  {
    link: '/user/models',
    image: '/images/leftMenu/user/spreadsheet.png',
    alt: 'models page'
  },
  {
    link: '/user/report',
    image: '/images/leftMenu/user/add.png',
    alt: 'create report'
  }
];

const User = () => (
  <Layout menuItems={blocks}>
    <Switch>
      <Route exact path="/user/home" component={() => <div>USER HOME</div>} />
    </Switch>
  </Layout>
);

export default User;
