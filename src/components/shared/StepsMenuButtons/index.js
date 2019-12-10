import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './stepMenuButtons.module.scss';
import Button from '../Button';
import { createModel, nextStep, prevStep } from '../../../store/createModel/actions';
import {
  getModelItemsCount,
  getModelName,
  getSelectedConnection,
  getStep,
} from '../../../store/createModel/selectors';

const StepMenuButtons = ({
  classes,
  activeStep,
  setNextStep,
  setPrevStep,
  selectedConnection,
  handleCreateModelButton,
  modelItemsCount,
  modelName,
}) => {
  const disableNextButton = useMemo(
    () => (activeStep === 1 && selectedConnection === null)
      || (activeStep === 2 && modelItemsCount === 0),
    [selectedConnection, activeStep, modelItemsCount],
  );
  const disabledCreateModelButton = useMemo(() => modelName.length === 0, [modelName]);
  return (
    <div className={classnames(styles.buttonsContainer, classes)}>
      {activeStep > 1 && (
        <Button classes={[styles.button, styles.prevButton]} type="button" onclick={setPrevStep}>
          <img className={styles.prevIcon} src="/images/left-arrow-gray.png" alt="arrow next" />
        </Button>
      )}
      {activeStep < 3 && (
        <Button
          classes={[styles.button, styles.nextButton]}
          type="button"
          onclick={setNextStep}
          disabled={disableNextButton}
        >
          <div className={styles.nextContainer}>
            <p>Next</p>
            <img src="/images/right-arrow.png" alt="arrow next" className={styles.nextIcon} />
          </div>
        </Button>
      )}
      {activeStep === 3 && (
        <Button
          classes={[styles.button, styles.nextButton]}
          type="button"
          onclick={handleCreateModelButton}
          disabled={disabledCreateModelButton}
        >
          <div className={styles.nextContainer}>
            <p>Create model</p>
          </div>
        </Button>
      )}
    </div>
  );
};

StepMenuButtons.defaultProps = {
  classes: '',
};

StepMenuButtons.propTypes = {
  activeStep: PropTypes.number.isRequired,
  modelItemsCount: PropTypes.number.isRequired,
  handleCreateModelButton: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  setPrevStep: PropTypes.func.isRequired,
  selectedConnection: PropTypes.number.isRequired,
  classes: PropTypes.string,
  modelName: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activeStep: getStep,
  modelName: getModelName,
  selectedConnection: getSelectedConnection,
  modelItemsCount: getModelItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  setNextStep: () => {
    dispatch(nextStep());
  },
  setPrevStep: () => {
    dispatch(prevStep());
  },
  handleCreateModelButton: () => {
    dispatch(createModel());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StepMenuButtons);
