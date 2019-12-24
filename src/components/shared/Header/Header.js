import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './header.module.scss';
import DropdownMenu from '../DropdownMenu';
import { getUsername } from '../../../store/user/selectors';
import { logout } from '../../../store/login/actions';
import { showPopup } from '../../../store/user/actions';

const Header = ({
  name,
  image,
  logout,
  changePassPopupShow,
}) => {
  const [displayDropdown, changeDropdownState] = useState(false);
  const toggleDropdown = useCallback(() => {
    changeDropdownState(!displayDropdown);
  }, [displayDropdown]);

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
        <p className={styles.siteName}>Datalyzer</p>
      </div>
      <div className={styles.block}>
        <p className={styles.userName}>{name}</p>
        <button onClick={toggleDropdown} className={styles.button}>
          <img src={image} alt="user" className={styles.userPhoto} />
        </button>
      </div>
      {displayDropdown && (
        <DropdownMenu classes={styles.dropdownUser} hideDropdown={toggleDropdown}>
          <div className={styles.textBlock} onClick={changePassPopupShow}>
            <p className={styles.dropdownText}>Change password</p>
            <div className={styles.line} />
          </div>
          <div className={styles.textBlock} onClick={logout}>
            <p className={styles.dropdownText}>Sign out</p>
            <img src="/images/logout.png" alt="sign out" className={styles.signOutIcon} />
          </div>
        </DropdownMenu>
      )}
    </div>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
  logout: PropTypes.func.isRequired,
  changePassPopupShow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: getUsername(state),
  image: '/images/userHeader.png',
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
  changePassPopupShow: () => {
    dispatch(showPopup());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
