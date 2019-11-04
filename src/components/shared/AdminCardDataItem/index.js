import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './adminCardDataItem.module.scss';

const AdminCardDataItem = ({ name, value, classes }) => (
  <p className={styles.key}>
    {`${name}: `}
    <span className={classnames(styles.value, classes)}>{value}</span>
  </p>
);


AdminCardDataItem.defaultProps = {
  classes: [''],
};

AdminCardDataItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.arrayOf(PropTypes.string)
};

export default AdminCardDataItem;
