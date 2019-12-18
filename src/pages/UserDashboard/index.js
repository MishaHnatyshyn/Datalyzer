import React, { useEffect, createRef } from 'react';
import DashboardMenu from './components/DashboardMenu';
import styles from './dashboard.module.scss';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import graphTypes from '../../config/graphtypes';
import Graph from '../../components/Graph';
import { getDashboard, getReports } from '../../store/userDashboard/selectors';
import { getUserDashboard } from '../../store/userDashboard/actions';

const Graphs = ({ reports, viewPortRef }) => {
  return (
    <>
      {
        reports.map((report) => {
          return (
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
          )
        })
      }
      </>
  )
};

Graphs.defaultProps = {
  reports: []
};

const UsersDashboard = ({ getDashboard, reports }) => {
  const { id } = useParams();
  const viewPortRef = createRef();

  useEffect(() => {
    getDashboard(id);
  }, []);

  return (
    <div className={styles.layout}>
    <div className={styles.dashboardLayout} ref={viewPortRef}>
      <Graphs reports={reports} viewPortRef={viewPortRef} />
    </div>

      <DashboardMenu />
    </div>
  )
};

const mapStateToProps = createStructuredSelector(
  {
    dashboard: getDashboard,
    reports: getReports,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboard: (id) => {dispatch(getUserDashboard(id))},
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDashboard);
