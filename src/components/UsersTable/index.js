import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './usersTableRow.module.scss';
import AlertMessage from '../shared/AlertMessage';

const UsersTableRow = ({
  userNo,
  username,
  description,
  creationDate,
  isError,
  errorMessage,
}) => {
  const alertClasses = useMemo(() => [
    styles.error,
    isError ? styles.visible : styles.hidden
  ], [isError]);
  return (
    <div className={styles.usersTable}>
    
    </div>
  );
};


export default UsersTableRow;
