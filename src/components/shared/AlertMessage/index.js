import React from 'react';
import PropTypes from 'prop-types';
import styles from './alertMessage.module.scss';

const AlertMessage = ({ message, children, classes }) => (
  <div className={[styles.container, ...classes].join(' ')}>
    {children}
    <p className={styles.message}>{message}</p>
  </div>
);

AlertMessage.defaultProps = {
  classes: [],
};

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

export default AlertMessage;
