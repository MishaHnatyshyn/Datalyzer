import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './stepsMenu.module.scss';
import { getStep } from '../../../store/createModel/selectors';

const StepsMenu = ({ activeStep, stepsAmount }) => (
  <div className={styles.container} style={{ width: stepsAmount * 100 + 110 }}>
    <div className={styles.progress} />
    <div className={styles.steps}>
      {[...new Array(stepsAmount)].map((_, index) => (
        <div className={classnames(styles.step, index + 1 === activeStep ? styles.active : '')}>
          {index + 1}
        </div>
      ))}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  activeStep: getStep(state),
});

StepsMenu.propTypes = {
  activeStep: PropTypes.number.isRequired,
  stepsAmount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(StepsMenu);
