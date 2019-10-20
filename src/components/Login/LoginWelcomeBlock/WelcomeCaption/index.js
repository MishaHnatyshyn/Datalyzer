import React from 'react';
import styles from './welcomeCaption.module.scss';
import Caption from '../../../shared/Caption';

const WelcomeCaption = () => (
  <Caption classes={[styles.welcomeCaption]}>
    Welcome to Datalyzer
  </Caption>
);

export default WelcomeCaption;
