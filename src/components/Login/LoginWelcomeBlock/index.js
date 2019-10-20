import React from 'react';
import styles from './loginWelcomeBlock.module.scss';
import WelcomeButton from './WelcomeButton';
import WelcomeCaption from './WelcomeCaption';

const LoginWelcomeBlock = () => (
  <div className={styles.welcomeBlock}>
    <div className={styles.container}>
      <WelcomeCaption />
      <div className={styles.line} />
      <p className={styles.textAbout}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Vivamus et nisl lorem. Vivamus dapibus velit dui, id sollicitudin ligula fringilla sed.
        Aliquam placerat risus eget euismod fringilla. Pellentesque convallis ac neque a varius.
      </p>
      <WelcomeButton onClick={() => {}} />
      <div className={styles.outCircle}>
        <div className={styles.innerCircle} />
      </div>
    </div>
  </div>
);

export default LoginWelcomeBlock;
