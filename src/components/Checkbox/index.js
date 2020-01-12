import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './checkbox.module.scss';

const Checkbox = ({
  include, onIncludeChange, name, classes
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={classNames(styles.container, classes)}>
    <input type="checkbox" checked={include} onChange={onIncludeChange} name={name} />
    <span className={styles.checkmark} />
  </label>
);

Checkbox.defaultProps = {
  name: 'name',
  classes: ''
};

Checkbox.propTypes = {
  include: PropTypes.bool.isRequired,
  onIncludeChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  classes: PropTypes.string
};

export default Checkbox;
