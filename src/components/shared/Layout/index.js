import React from 'react';
import PropTypes from 'prop-types';
import styles from './layout.module.scss';
import Header from '../Header/Header';
import LeftSideMenu from '../LeftSideMenu';

const Layout = ({ children, menuItems }) => (
  <div className={styles.container}>
    <Header />
    <div className={styles.page}>
      <LeftSideMenu menuElements={menuItems} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    image: PropTypes.string,
    alt: PropTypes.string
  })).isRequired,
  children: PropTypes.element.isRequired
};

export default Layout;
