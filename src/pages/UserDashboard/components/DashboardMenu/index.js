import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './dashboardMenu.module.scss';

const DashboardMenu = ({ dashboardName, dashboards }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.title}>
        {dashboardName}
      </div>
      <div className={styles.item}>Change name</div>
      <div className={styles.item}>Export as PDF</div>
      <div className={styles.item}>Delete</div>

      <div className={styles.separator}/>

      <div className={styles.title}>
        Other dashboards
      </div>

      <div>
        {
          dashboards.map(({ name, id }) => (
            <Link to={id} key={id}>
              {name}
            </Link>
          ))
        }
      </div>
    </div>
  )
};

DashboardMenu.propTypes = {
  dashboardName: PropTypes.string,
  dashboards: PropTypes.array,
};

DashboardMenu.defaultProps = {
  dashboards: [],
  dashboardName: 'Dashboard name'
};

export default DashboardMenu;
