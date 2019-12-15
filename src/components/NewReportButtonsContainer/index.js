import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../shared/StepsMenuButtons/stepMenuButtons.module.scss';
import Button from '../shared/Button';
import CancelButton from '../shared/CancelButton';

const NewReportButtonsContainer = ({ classes }) => (
  <div className={classnames(styles.buttonsContainer, classes)}>
    <CancelButton onClick={() => {}}> Cancel </CancelButton>
    <Button
      classes={[styles.button, styles.nextButton]}
      type="button"
      onclick={() => {}}
      disabled={false}
    >
      <div className={styles.nextContainer}>
        <p>Select dashboard</p>
        <img src="/images/right-arrow.png" alt="arrow next" className={styles.nextIcon} />
      </div>
    </Button>
  </div>
);

NewReportButtonsContainer.defaultProps = {
  classes: '',
};

NewReportButtonsContainer.propTypes = {
  classes: PropTypes.string
};

export default NewReportButtonsContainer;
