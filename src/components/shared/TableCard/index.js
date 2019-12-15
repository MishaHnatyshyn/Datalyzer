import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './tableCard.module.scss';

const TableCard = ({ table_name, onDelete, classes }) => (
  <div className={classnames(styles.container, classes)}>
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

TableCard.defaultProps = {
  classes: ''
};

TableCard.propTypes = {
  table_name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.string
};

export default TableCard;
