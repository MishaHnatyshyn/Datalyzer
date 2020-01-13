import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../../components/shared/Layout';
import CreateReportUser from '../CreateReport';
import UserDashboard from '../UserDashboard';
import DashboardsList from '../DashboardsList';
import UserModels from '../ModelsUser';

const blocks = [
  {
    link: '/user/home',
    image: '/images/leftMenu/user/bars.png',
    alt: 'dashboards',
  },
  {
    link: '/user/models',
    image: '/images/leftMenu/user/spreadsheet.png',
    alt: 'models page',
  },
  {
    link: '/user/report',
    image: '/images/leftMenu/user/add.png',
    alt: 'create report',
  },
];

const User = () => (
  <Layout menuItems={blocks}>
    <Switch>
      <Route exact path="/user/report" component={CreateReportUser} />
      <Route exact path="/user/models" component={UserModels} />
      <Route exact path="/user/dashboard/:id" component={UserDashboard} />
      <Route exact path="/user/home" component={DashboardsList} />
    </Switch>
  </Layout>
);

export default User;
