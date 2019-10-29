import React from 'react';
import styles from './loginCaption.module.scss';
import Caption from '../../../shared/Caption';

const LoginCaption = () => (
  <Caption classes={[styles.loginCaption]}>
    Log in
  </Caption>
);

export default LoginCaption;
