import React from 'react';
import PropTypes from 'prop-types';
import styles from './cancelButton.module.scss';
import Button from '../Button';

const CancelButton = ({ children, onClick }) => (
  <Button onclick={onClick} type="button" classes={[styles.button, styles.cancelButton]}>{children}</Button>
);

CancelButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CancelButton;
