import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './leftSideMenu.module.scss';

const LeftSideMenu = ({ menuElements }) => (
  <div className={styles.container}>
    {
      menuElements.map((element) => (
        <div className={styles.block} key={element.link}>
          <Link to={element.link}>
            <div className={styles.item}>
              <img src={element.image} alt={element.alt} />
            </div>
          </Link>
        </div>
      ))
    }
  </div>
);

LeftSideMenu.defaultProps = {
  menuElements: []
};

LeftSideMenu.propTypes = {
  menuElements: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    image: PropTypes.string,
    alt: PropTypes.string
  }))
};

export default LeftSideMenu;
