import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import DataCardGrid from '../../components/shared/DataCardGrid';
import NoResult from '../../components/shared/NoResult';
import DashboardDataCard from '../../components/DashboardDataCard';
import { fetchDashboards } from '../../store/dashboard/actions';
import DashboardsPageHeader from './DashboardsPageHeader';
import { getDashboards } from '../../store/dashboard/selectors';

const DashboardsList = ({ dashboards, fetchDashboards }) => {
  useEffect(() => {
    fetchDashboards();
  }, []);

  return (
    <div>
      <DashboardsPageHeader />
      {dashboards && dashboards.length ? (
        <DataCardGrid>
          {dashboards.map((dashboard) => (
            <DashboardDataCard {...dashboard} key={dashboard.id} />
          ))}
        </DataCardGrid>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

DashboardsList.propTypes = {
  fetchDashboards: PropTypes.func.isRequired,
  dashboards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboards: getDashboards,
});

const mapDispatchToPros = (dispatch) => ({
  fetchDashboards: () => dispatch(fetchDashboards()),
});

export default connect(mapStateToProps, mapDispatchToPros)(DashboardsList);
