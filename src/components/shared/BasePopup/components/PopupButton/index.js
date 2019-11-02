import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './popupButton.module.scss';

const popupButton = ({ onClick, type, text }) => (
  <button onClick={onClick} className={classnames(styles.button, styles[type])}>
    { text }
  </button>
);

popupButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['cancel', 'ok', 'submit']).isRequired
};

export default popupButton;
