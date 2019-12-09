import React from 'react';
import PropTypes from 'prop-types';
import styles from './connectionCardGrid.module.scss';

const ConnectionCardGrid = ({ children }) => (
  <div className={styles.grid}>
    {children}
  </div>
);

ConnectionCardGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConnectionCardGrid;
