import React from 'react';
import styles from './buildReport.module.scss';
import ReportDataSection from '../ReportDataSection';
import ReportSection from '../ReportSection';

const BuildReport = () => (
  <div className={styles.container}>
    <ReportDataSection />
    <img src="/images/import.png" alt="next" className={styles.arrow} />
    <ReportSection />
  </div>
);

export default BuildReport;
