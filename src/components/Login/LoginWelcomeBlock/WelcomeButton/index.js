import React from 'react';
import PropTypes from 'prop-types';
import styles from './welcomeButton.module.scss';
import Button from '../../../shared/Button';

const WelcomeButton = ({ onClick }) => (
  <Button onclick={onClick} classes={[styles.welcomeButton]}>
    Know more
  </Button>
);

WelcomeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default WelcomeButton;
