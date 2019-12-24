import React from 'react';
import PropTypes from 'prop-types';
import styles from './dataCard.module.scss';
import DataContainer from '../DataContainer';

const DataCard = ({
  caption,
  children,
  secondIcon,
  thirdIcon,
  onSecondButtonClick,
  onThirdButtonClick,
}) => (
  <DataContainer topText={caption}>
    <div className={styles.bottomBlock}>
      <div className={styles.dataBlock}>
        {children}
        <div className={styles.line} />
      </div>
      <div className={styles.iconsBlock}>
        <button onClick={onSecondButtonClick}>
          <img src={secondIcon} alt="second icon" className={styles.icon} />
        </button>
        {thirdIcon && (
          <button onClick={onThirdButtonClick}>
            <img src={thirdIcon} alt="third icon" className={styles.icon} />
          </button>
        )}
      </div>
    </div>
  </DataContainer>
);

DataCard.propTypes = {
  caption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  secondIcon: PropTypes.string.isRequired,
  thirdIcon: PropTypes.string.isRequired,
  onSecondButtonClick: PropTypes.func.isRequired,
  onThirdButtonClick: PropTypes.func.isRequired,
};

export default DataCard;
