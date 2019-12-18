import React from 'react';
import PropTypes from 'prop-types';
import styles from './NextButton.module.scss';
import Button from '../Button';

const NextButton = ({ setNextStep, disableNextButton, text }) => (
  <Button
    classes={[styles.button, styles.nextButton]}
    type="button"
    onclick={setNextStep}
    disabled={disableNextButton}
  >
    <div className={styles.nextContainer}>
      <p>{text}</p>
      <img src="/images/right-arrow.png" alt="arrow next" className={styles.nextIcon} />
    </div>
  </Button>
);

NextButton.propTypes = {
  setNextStep: PropTypes.func.isRequired,
  disableNextButton: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default NextButton;
