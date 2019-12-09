import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './dataContainer.module.scss';

const DataContainer = ({ topText, children, classes }) => (
  <div className={classnames(styles.container, classes)}>
    <div className={styles.topBlock}>
      <p className={styles.caption}>{topText}</p>
    </div>
    {children}
  </div>
);

DataContainer.defaultProps = {
  classes: '',
};

DataContainer.propTypes = {
  topText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.string,
};

export default DataContainer;
