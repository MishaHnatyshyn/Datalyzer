import React from 'react';
import styles from './createReport.module.scss';
import BuildReport from '../../components/BuildReport';
import ReportSection from '../../components/ReportSection';

const CreateReport = () => (
  <div className={styles.container}>
    <BuildReport />
    <img src="/images/import.png" alt="next" className={styles.arrow} />
    <ReportSection />
  </div>
);

export default CreateReport;
