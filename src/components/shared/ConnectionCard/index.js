import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './connectionCard.module.scss';

const ConnectionCard = ({ name, onClick, selected }) => (
  <button className={classnames(styles.container, selected)} onClick={onClick}>
    <img src="/images/link.png" alt="link" className={styles.icon} />
    <p className={styles.name}>{name}</p>
  </button>
);

ConnectionCard.defaultProps = {
  selected: ''
};

ConnectionCard.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string
};

export default ConnectionCard;
