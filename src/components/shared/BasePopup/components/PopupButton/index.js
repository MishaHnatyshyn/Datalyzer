import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './popupButton.module.scss';

const popupButton = ({
  onClick, type, text, classes
}) => (
  <button onClick={onClick} className={classnames(styles.button, styles[type], classes)}>
    { text }
  </button>
);

popupButton.defaultProps = {
  classes: '',
};

popupButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['cancel', 'ok', 'submit']).isRequired,
  classes: PropTypes.string
};

export default popupButton;
