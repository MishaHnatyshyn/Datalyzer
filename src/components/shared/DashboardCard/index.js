import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './dashboardCard.module.scss';

const DashboardCard = ({ name, onClick, selected }) => (
  <button className={classnames(styles.container, selected)} onClick={onClick}>
    <img src="/images/dashboard.png" alt="dashboard" className={styles.image} />
    <p className={styles.name}>{name}</p>
  </button>
);

DashboardCard.defaultProps = {
  selected: ''
};

DashboardCard.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string
};

export default DashboardCard;
