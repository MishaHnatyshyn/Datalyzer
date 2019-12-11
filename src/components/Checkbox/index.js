import React from 'react';
import PropTypes from 'prop-types';
import styles from './checkbox.module.scss';

const Checkbox = ({ include, onIncludeChange, name }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={styles.container}>
    <input type="checkbox" checked={include} onChange={onIncludeChange} name={name} />
    <span className={styles.checkmark} />
  </label>
);

Checkbox.defaultProps = {
  name: 'name',
};

Checkbox.propTypes = {
  include: PropTypes.bool.isRequired,
  onIncludeChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default Checkbox;
