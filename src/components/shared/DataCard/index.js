import React from 'react';
import PropTypes from 'prop-types';
import styles from './dataCard.module.scss';
import DataContainer from '../DataContainer';

const DataCard = ({
  caption, children, firstIcon, secondIcon, thirdIcon
}) => (
  <DataContainer topText={caption}>
    <div className={styles.bottomBlock}>
      <div className={styles.dataBlock}>
        {children}
        <div className={styles.line} />
      </div>
      <div className={styles.iconsBlock}>
        <button>
          <img src={firstIcon} alt="first icon" className={styles.icon} />
        </button>
        <button>
          <img src={secondIcon} alt="second icon" className={styles.icon} />
        </button>
        <button>
          <img src={thirdIcon} alt="third icon" className={styles.icon} />
        </button>
      </div>
    </div>
  </DataContainer>
);

DataCard.propTypes = {
  caption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  firstIcon: PropTypes.string.isRequired,
  secondIcon: PropTypes.string.isRequired,
  thirdIcon: PropTypes.string.isRequired,
};

export default DataCard;
