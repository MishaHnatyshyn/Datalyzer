import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './textField.module.scss';

const Input = ({
  text, children, type, onChange, value, withImage, classes,
}) => {
  function handleChange(event) {
    onChange(event.target.value);
  }
  return (
    <div className={styles.container}>
      <input
        className={classnames(styles.input, withImage ? styles.withImage : '', classes)}
        value={value}
        type={type}
        placeholder={text}
        onChange={handleChange}
      />
      {children}
    </div>
  );
};

Input.defaultProps = {
  withImage: false,
  classes: '',
};

Input.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.string,
  value: PropTypes.string.isRequired,
  withImage: PropTypes.bool,
};

export default Input;
