import React from 'react';
import spinner from './spinner.png';
import styles from './loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <img src={spinner} alt="spinner" />
    </div>
  );
}
