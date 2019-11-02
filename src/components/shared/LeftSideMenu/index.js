import React from 'react';
import { Link } from 'react-router-dom';
import styles from './leftSideMenu.module.scss';

const LeftSideMenu = () => (
  <div className={styles.container}>
    <div className={styles.block}>
      <Link to="/admin/home">
        <div className={styles.item}>
          <img src="/images/home.png" alt="home page" />
        </div>
      </Link>
    </div>
    <div className={styles.block}>
      <Link to="/admin/databases">
        <div className={styles.item}>
          <img src="/images/database.png" alt="databases page" />
        </div>
      </Link>

    </div>
    <div className={styles.block}>
      <Link to="/admin/models">
        <div className={styles.item}>
          <img src="/images/spreadsheet.png" alt="models page" />
        </div>
      </Link>

    </div>
    <div className={styles.block}>
      <Link to="/admin/users">
        <div className={styles.item}>
          <img src="/images/group.png" alt="users page" />
        </div>
      </Link>

    </div>

  </div>
);

export default LeftSideMenu;
