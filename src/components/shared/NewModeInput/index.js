import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './newModeInput.module.scss';

const NewModeInput = ({
  value, changeValue, classes, placeholder
}) => (
  <input type="text" value={value} onChange={changeValue} className={classnames(styles.input, classes)} placeholder={placeholder} />
);

NewModeInput.defaultProps = {
  classes: '',
  placeholder: ''
};

NewModeInput.propTypes = {
  value: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  classes: PropTypes.string,
  placeholder: PropTypes.string
};

export default NewModeInput;
