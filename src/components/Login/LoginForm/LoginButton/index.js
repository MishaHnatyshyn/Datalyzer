import React from 'react';
import styles from './loginButton.module.scss';
import Button from '../../../shared/Button';

const LoginButton = () => (
  <Button type="submit" classes={[styles.loginButton]}>
    Login
  </Button>
);

export default LoginButton;
