import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './leftSideMenu.module.scss';

const blocks = [
  {
    link: '/admin/home',
    image: '/images/home.png',
    alt: 'home page'
  },
  {
    link: '/admin/databases',
    image: '/images/database.png',
    alt: 'databases page'
  },
  {
    link: '/admin/models',
    image: '/images/spreadsheet.png',
    alt: 'models page'
  },
  {
    link: '/admin/users',
    image: '/images/group.png',
    alt: 'users page'
  }
];

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

LeftSideMenu.propTypes = {
  menuElements: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    image: PropTypes.string,
    alt: PropTypes.string
  })).isRequired
};

const mapStateToProps = () => ({
  menuElements: blocks
});

export default connect(mapStateToProps)(LeftSideMenu);
