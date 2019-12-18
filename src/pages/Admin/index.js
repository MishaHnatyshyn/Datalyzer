import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ModelsAdmin from '../ModelsAdmin';
import HomeAdmin from '../HomeAdmin';
import DatabasesAdmin from '../DatabasesAdmin';
import UsersAdmin from '../UsersAdmin';
import CreateModelAdmin from '../CreateModel';
import Layout from '../../components/shared/Layout';

const blocks = [
  {
    link: '/admin/home',
    image: '/images/leftMenu/admin/home.png',
    alt: 'home page'
  },
  {
    link: '/admin/databases',
    image: '/images/leftMenu/admin/database.png',
    alt: 'databases page'
  },
  {
    link: '/admin/models',
    image: '/images/leftMenu/admin/spreadsheet.png',
    alt: 'models page'
  },
  {
    link: '/admin/users',
    image: '/images/leftMenu/admin/group.png',
    alt: 'users page'
  }
];

const Admin = () => (
  <Layout menuItems={blocks}>
    <Switch>
      <Route exact path="/admin/home" component={HomeAdmin} />
      <Route exact path="/admin/models" component={ModelsAdmin} />
      <Route path="/admin/databases" component={DatabasesAdmin} />
      <Route path="/admin/users" component={UsersAdmin} />
      <Route exact path="/admin/models/create" component={CreateModelAdmin} />
    </Switch>
  </Layout>
);

export default Admin;
