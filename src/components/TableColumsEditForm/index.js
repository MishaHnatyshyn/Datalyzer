import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './tableColumnsEditForm.module.scss';

const TableColumnsEditForm = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.table}>
      <div className={classnames(styles.row, styles.tableHeader)}>
        <div className={classnames(styles.tableCell)}>Column name</div>
        <div className={classnames(styles.tableCell)}>Column type</div>
        <div className={classnames(styles.tableCell, styles.thirdColumn)}>Include</div>
      </div>
      <div className={styles.rowContainer}>{children}</div>
    </div>
  </div>
);

TableColumnsEditForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect()(TableColumnsEditForm);
