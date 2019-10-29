import React from 'react';
import styles from './login.module.scss';
import LoginWelcomeBlock from '../../components/Login/LoginWelcomeBlock';
import LoginForm from '../../components/Login/LoginForm';

const Login = () => (
  <div className={styles.loginContainer}>
    <img className={styles.logo} src="/images/icon.png" alt="logo" />
    <LoginWelcomeBlock />
    <LoginForm />
  </div>
);

export default Login;
