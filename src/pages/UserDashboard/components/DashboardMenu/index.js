import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import styles from './dashboardMenu.module.scss';
import { createStructuredSelector } from 'reselect';
import { getDashboardName } from '../../../../store/userDashboard/selectors';
import { getDashboards } from '../../../../store/dashboard/selectors';
import { fetchDashboards } from '../../../../store/dashboard/actions';

const DashboardMenu = ({ dashboardName, dashboards, fetchDashboards }) => {
  useEffect(() => {
    if (dashboards.length) {
      return
    }

    fetchDashboards();
  }, []);
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
            <Link to={id} key={id} className={styles.link}>
              <span className={styles.item}>
                {name}
              </span>
              <img src="/public/images/dashboard/arrow-right.svg" alt="" className={styles.arrow} />
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
  dashboards: [{name: 'kek', id: 1}],
  dashboardName: 'Dashboard name'
};

const mapStateToProps = createStructuredSelector(
  {
    dashboardName: getDashboardName,
    dashboards: getDashboards
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDashboards: () => {dispatch(fetchDashboards())}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
