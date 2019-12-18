import React from 'react';
import DashboardMenu from './components/DashboardMenu';
import styles from './dashboard.module.scss';

import Graph from '../../components/Graph';

const UsersDashboard = () => {
  return (
    <div className={styles.layout}>
    <div className={styles.dashboardLayout}>
      <Graph type={'Doughnut'} />
      <Graph type={'Pie'} disableMoveAndScale />
    </div>

      <DashboardMenu />
    </div>
  )
};

export default UsersDashboard;
