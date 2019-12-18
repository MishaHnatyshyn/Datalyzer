import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './caption.module.scss';

const Caption = ({ classes, children }) => (
  <p className={classnames(styles.captionCommon, classes)}>
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
