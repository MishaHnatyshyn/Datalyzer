import React, { useEffect, createRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './dashboard.module.scss';
import DashboardMenu from './components/DashboardMenu';
import graphTypes from '../../config/graphtypes';
import Graph from '../../components/Graph';
import { getDashboard, getReports } from '../../store/userDashboard/selectors';
import { getUserDashboard } from '../../store/userDashboard/actions';

const Graphs = ({ reports, viewPortRef }) => (
  <>
    {reports.map((report) => (
      <Graph
        id={report.id}
        type={graphTypes[report.report_type_id]}
        key={report.id}
        items={report.report_items}
        facts={report.facts}
        dimensions={report.dimensions}
        startLeftPosition={report.position_x}
        startTopPosition={report.position_y}
        startWidth={report.width}
        viewPortRef={viewPortRef}
      />
    ))}
  </>
);

Graphs.defaultProps = {
  reports: [],
};

Graphs.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.shape),
  viewPortRef: PropTypes.element.isRequired,
};

const UsersDashboard = ({ getDashboard, reports }) => {
  const { id } = useParams();
  const viewPortRef = createRef();

  useEffect(() => {
    if (!id) {
      return;
    }

    getDashboard(id);
  }, [id]);

  return (
    <div className={styles.layout}>
      <div className={styles.dashboardLayout} ref={viewPortRef} id="dashboard-layout">
        <Graphs reports={reports} viewPortRef={viewPortRef} />
      </div>
      <div id="editor" />

      <DashboardMenu id={id} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  dashboard: getDashboard,
  reports: getReports,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboard: (id) => {
    dispatch(getUserDashboard(id));
  },
});

UsersDashboard.propTypes = {
  getDashboard: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDashboard);
