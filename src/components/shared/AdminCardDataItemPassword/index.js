import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './adminCardDataItemPassword.module.scss';

const AdminCardDataItemPassword = ({ name, value, classes }) => (
  <div className={styles.container}>
    <p className={styles.key}>
      {`${name}: `}
      <span className={classnames(styles.value, classes)}>{value.replace(/./g, '*')}</span>
    </p>
    <button className={styles.button}>
      <img src="/images/copy-content.png" alt="copy" className={styles.icon} />
    </button>
  </div>

);


AdminCardDataItemPassword.defaultProps = {
  classes: '',
};

AdminCardDataItemPassword.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.string
};

export default AdminCardDataItemPassword;
