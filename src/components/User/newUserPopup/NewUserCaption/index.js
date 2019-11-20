import React from 'react';
import styles from './newUserCaption.module.scss';
import Caption from '../../../shared/Caption';

const newUserCaption = () => (
  <Caption classes={[styles.newUserCaption]}>
    Add new user
  </Caption>
);

export default newUserCaption;
