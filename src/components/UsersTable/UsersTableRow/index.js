import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './usersTableRow.module.scss';
import AlertMessage from '../../shared/AlertMessage';

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
    <div className={styles.loginForm}>
    
    </div>
  );
};

UsersTableRow.defaultProps = {
  description: '',
};

UsersTableRow.propTypes = {
  username: PropTypes.string.isRequired,
  userNo: PropTypes.number.isRequired,
  description: PropTypes.string,
  creationDate: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};


export default UsersTableRow;
