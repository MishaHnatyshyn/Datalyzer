import React from 'react';
import PropTypes from 'prop-types';
import styles from './dataCardGrid.module.scss';

const DataCardGrid = ({ children }) => (
  <div className={styles.grid}>
    {children}
  </div>
);

DataCardGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataCardGrid;
