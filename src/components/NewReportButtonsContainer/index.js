import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './newReportButtonsContainer.module.scss';
import CancelButton from '../shared/CancelButton';
import NextButton from '../shared/NextButton';

const NewReportButtonsContainer = ({ classes }) => (
  <div className={classnames(styles.buttonsContainer, classes)}>
    <CancelButton onClick={() => {}}> Cancel </CancelButton>
    <NextButton disableNextButton={false} setNextStep={() => {}} text="Select dashboard" />
  </div>
);

NewReportButtonsContainer.defaultProps = {
  classes: '',
};

NewReportButtonsContainer.propTypes = {
  classes: PropTypes.string,
};

export default NewReportButtonsContainer;
