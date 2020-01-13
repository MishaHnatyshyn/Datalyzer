import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import styles from './createReport.module.scss';
import BuildReport from '../../components/BuildReport';
import NewReportButtonsContainer from '../../components/NewReportButtonsContainer';
import ReportDashboardPage from '../../components/ReportDashboardPage';
import { getCurrentStep } from '../../store/createReport/selectors';

const CreateReport = ({ step }) => (
  <div className={styles.container}>
    {step === 1 ? <BuildReport /> : <ReportDashboardPage />}
    <NewReportButtonsContainer classes={styles.stepsButton} />
  </div>
);

const mapStateToProps = createStructuredSelector({
  step: getCurrentStep,
});

CreateReport.propTypes = {
  step: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(CreateReport);
