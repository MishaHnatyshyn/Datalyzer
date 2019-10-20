import React from 'react';
import PropTypes from 'prop-types';
import styles from './caption.module.scss';

const Caption = ({ classes, children }) => (
  <p className={[styles.captionCommon, ...classes].join(' ')}>
    {children}
  </p>
);

Caption.defaultProps = {
  classes: [],
};

Caption.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired
};

export default Caption;
