import React from 'react';
import styles from './newDBCaption.module.scss';
import Caption from '../../shared/Caption';

const newDBCaption = () => (
  <Caption classes={[styles.newDBCaption]}>
    Add new connection
  </Caption>
);

export default newDBCaption;
