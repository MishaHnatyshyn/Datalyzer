import React from 'react';
import styles from './buildReport.module.scss';
import ReportDataSection from '../ReportDataSection';
import NewReportButtonsContainer from '../NewReportButtonsContainer';

const BuildReport = () => (
  <div className={styles.container}>
    <ReportDataSection />
    <NewReportButtonsContainer classes={styles.stepsButton} />
  </div>
);

export default BuildReport;
