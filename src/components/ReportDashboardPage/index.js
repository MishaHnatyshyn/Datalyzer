import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ConnectionCardGrid from '../shared/ConnectionCardGrid';
import DashboardCard from '../shared/DashboardCard';
import { getDashboards } from '../../store/dashboard/selectors';
import { fetchDashboards } from '../../store/dashboard/actions';
import NewDashboardCard from '../shared/DashboardCard/NewDashboardCard';

const ReportDashboardPage = ({ dashboards, fetchDashboards }) => {
  useEffect(() => {
    console.log('kakashka');
    fetchDashboards();
  }, []);

  return (
    <ConnectionCardGrid>
      {dashboards
        && dashboards.map(
          (dashboard) => <DashboardCard onClick={() => {}} name={dashboard.name} />
        )}
      <NewDashboardCard onClick={() => {}} />
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
};

const mapStateToProps = createStructuredSelector({
  dashboards: getDashboards,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDashboards: () => {
    dispatch(fetchDashboards());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDashboardPage);
