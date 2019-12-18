import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './dropdownMenu.module.scss';

const DropdownMenu = ({ children, classes, hideDropdown }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        hideDropdown();
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={classnames(styles.container, classes)}>{children}</div>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  hideDropdown: PropTypes.func.isRequired
};

export default DropdownMenu;
