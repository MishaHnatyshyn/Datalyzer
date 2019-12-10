import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './button.module.scss';

const Button = ({
  onclick, classes, children, type, disabled
}) => (
  <button
    type={type}
    onClick={onclick}
    className={classnames(styles.buttonCommon, ...classes)}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  classes: [],
  type: 'button',
  onclick: () => {},
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onclick: PropTypes.func,
  classes: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default Button;
