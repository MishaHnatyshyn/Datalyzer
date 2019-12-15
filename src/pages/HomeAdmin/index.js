import React from 'react';
import classnames from 'classnames';
import HomeCard from '../../components/shared/NavigationCard';
import styles from './homeAdmin.module.scss';

const HomeAdmin = () => (
  <div className={styles.container}>
    <div className={styles.block}>
      <HomeCard
        text="Go to database list"
        icon="/images/left-arrow-light.png"
        link="/admin/databases"
        image="/images/database_big.png"
        containerClass={styles.containerClass}
      />

      <HomeCard
        text="Go to models list"
        icon="/images/left-arrow-light.png"
        link="/admin/models"
        image="/images/157-512.png"
        containerClass={styles.containerClass}
      />

      <HomeCard
        text="Go to users list"
        link="/admin/users"
        icon="/images/left-arrow-light.png"
        image="/images/users.png"
        containerClass={styles.containerClass}
      />
    </div>

    <div className={classnames(styles.block, styles.bottomBlock)}>
      <HomeCard
        text="New Database"
        link="/admin/databases/create"
        icon="/images/plussmall.png"
        image="/images/database_big.png"
        lineClass={styles.lineClass}
      />

      <HomeCard
        text="New Model"
        link="/admin/models/create"
        icon="/images/plussmall.png"
        image="/images/157-512.png"
        lineClass={styles.lineClass}
      />

      <HomeCard
        text="New User"
        link="/admin/users/create"
        icon="/images/plussmall.png"
        image="/images/users.png"
        lineClass={styles.lineClass}
      />
    </div>
  </div>
);

export default HomeAdmin;
