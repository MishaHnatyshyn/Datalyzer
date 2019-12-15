import React from 'react';
import PropTypes from 'prop-types';
import styles from './textarea.module.scss';

const Textarea = ({
  text, children, onChange, value, classes, name
}) => {
  function handleChange(event) {
    onChange(event.target.value);
  }
  return (
    <div className={styles.container}>
      <textarea
        className={classes}
        value={value}
        name={name}
        placeholder={text}
        onChange={handleChange}
      >
        {text}
      </textarea>
      {children}
    </div>
  );
};

Textarea.defaultProps = {
  classes: styles.textarea
};

Textarea.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default Textarea;
