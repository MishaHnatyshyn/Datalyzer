import React from 'react';
import PropTypes from 'prop-types';
import styles from './dataCard.module.scss';

const DataCard = ({
  caption, children, firstIcon, secondIcon, thirdIcon
}) => (
  <div className={styles.container}>
    <div className={styles.topBlock}>
      <p className={styles.caption}>{caption}</p>
    </div>
    <div className={styles.bottomBlock}>
      <div className={styles.dataBlock}>
        {children}
        <div className={styles.line} />
      </div>
      <div className={styles.iconsBlock}>
        <button className={styles.button}>
          <img src={firstIcon} alt="first icon" className={styles.icon} />
        </button>
        <button className={styles.button}>
          <img src={secondIcon} alt="second icon" className={styles.icon} />
        </button>
        <button className={styles.button}>
          <img src={thirdIcon} alt="third icon" className={styles.icon} />
        </button>
      </div>
    </div>
  </div>
);

DataCard.propTypes = {
  caption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  firstIcon: PropTypes.string.isRequired,
  secondIcon: PropTypes.string.isRequired,
  thirdIcon: PropTypes.string.isRequired,
};

export default DataCard;
