import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styles from './newReportButtonsContainer.module.scss';
import CancelButton from '../shared/CancelButton';
import NextButton from '../shared/NextButton';
import {
  getCurrentStep,
  getSelectedDashboard,
  isChartSelected,
} from '../../store/createReport/selectors';
import {
  createReport,
  goToTheSecondStep,
  returnToTheFirstStep,
} from '../../store/createReport/actions';

const NextButtonText = {
  1: 'Select dashboard',
  2: 'Create report',
};

const NewReportButtonsContainer = ({
  classes,
  isChartDataSelected,
  step,
  goToSecondStep,
  goToFirstStep,
  selectedDashboard,
  createNewReport,
}) => {
  const disableButton = useMemo(
    () => (step === 1 && !isChartDataSelected) || (step === 2 && !selectedDashboard),
    [step, isChartDataSelected, selectedDashboard],
  );
  return (
    <div className={classnames(styles.buttonsContainer, classes)}>
      <div className={styles.buttonPosition}>
        <CancelButton onClick={goToFirstStep}> Cancel </CancelButton>
      </div>
      <NextButton
        disableNextButton={disableButton}
        setNextStep={step === 1 ? goToSecondStep : createNewReport}
        text={NextButtonText[step]}
      />
    </div>
  );
};

NewReportButtonsContainer.defaultProps = {
  classes: '',
};

NewReportButtonsContainer.propTypes = {
  classes: PropTypes.string,
  isChartDataSelected: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  goToSecondStep: PropTypes.func.isRequired,
  goToFirstStep: PropTypes.func.isRequired,
  selectedDashboard: PropTypes.number.isRequired,
  createNewReport: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  step: getCurrentStep,
  isChartDataSelected: isChartSelected,
  selectedDashboard: getSelectedDashboard,
});

const mapDispatchToProps = (dispatch) => ({
  goToSecondStep: () => {
    dispatch(goToTheSecondStep());
  },
  goToFirstStep: () => {
    dispatch(returnToTheFirstStep());
  },
  createNewReport: () => {
    dispatch(createReport());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewReportButtonsContainer);
