import React from 'react';
import PropTypes from 'prop-types';
import styles from './tableCard.module.scss';

const TableCard = ({ table_name, onDelete }) => (
  <div className={styles.container}>
    <img src="/images/menu.png" alt="menu" className={styles.firstMenu} />
    <img src="/images/menu.png" alt="menu" className={styles.secondMenu} />
    <p>{table_name}</p>
    {onDelete && (
      <button onClick={onDelete} className={styles.deleteButton}>
        <img src="/images/cross.png" alt="delete" className={styles.firstMenu} />
      </button>
    )}
  </div>
);

TableCard.propTypes = {
  table_name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TableCard;
