import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ConnectionCardGrid from '../shared/ConnectionCardGrid';
import DashboardCard from '../shared/DashboardCard';
import { getDashboards } from '../../store/dashboard/selectors';
import { fetchDashboards } from '../../store/dashboard/actions';
import NewDashboardCard from '../shared/DashboardCard/NewDashboardCard';
import styles from './reportDashboardPage.module.scss';
import { selectDashboard } from '../../store/createReport/actions';
import { getSelectedDashboard } from '../../store/createReport/selectors';

const ReportDashboardPage = ({
  dashboards, fetchDashboards, selectDashboard, selectedDashboard
}) => {
  useEffect(() => {
    fetchDashboards();
  }, []);

  return (
    <ConnectionCardGrid>
      {dashboards
        && dashboards.map((dashboard) => (
          <DashboardCard
            onClick={() => selectDashboard(dashboard.id)}
            name={dashboard.name}
            selected={selectedDashboard === dashboard.id ? styles.selected : ''}
          />
        ))}
      <NewDashboardCard onClick={() => selectDashboard(null)} />
    </ConnectionCardGrid>
  );
};

ReportDashboardPage.propTypes = {
  dashboards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      created_at: PropTypes.string,
      updated_at: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  fetchDashboards: PropTypes.func.isRequired,
  selectDashboard: PropTypes.func.isRequired,
  selectedDashboard: PropTypes.number.isRequired
};

const mapStateToProps = createStructuredSelector({
  dashboards: getDashboards,
  selectedDashboard: getSelectedDashboard
});

const mapDispatchToProps = (dispatch) => ({
  fetchDashboards: () => {
    dispatch(fetchDashboards());
  },
  selectDashboard: (id) => {
    dispatch(selectDashboard(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDashboardPage);
