import React from 'react';
import PropTypes from 'prop-types';
import styles from './popupButton.module.scss';

const popupButton = ({ onClick, type, text }) => (
  <button onClick={onClick} className={[styles.button, styles[type]].join(' ')}>
    { text }
  </button>
);

popupButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['cancel', 'ok', 'submit']).isRequired
};

export default popupButton;
