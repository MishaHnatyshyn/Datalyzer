import React from 'react';
import styles from './createReport.module.scss';
import BuildReport from '../../components/BuildReport';
import NewReportButtonsContainer from '../../components/NewReportButtonsContainer';
import ReportDashboardPage from '../../components/ReportDashboardPage';

const CreateReport = () => (
  <div className={styles.container}>
    {/* <BuildReport /> */}
    <ReportDashboardPage />
    <NewReportButtonsContainer classes={styles.stepsButton} />
  </div>
);

export default CreateReport;
