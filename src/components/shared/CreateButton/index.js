import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './createButton.module.scss';

const CreateButton = ({
  onclick, classes, children, type, link
}) => (
  <Link to={link}>
    <button type={type} onClick={onclick} className={[styles.buttonCommon, ...classes].join(' ')}>
      {children}
      <img src="/images/plus.png" alt="create" className={styles.plusIcon} />
    </button>
  </Link>
);

CreateButton.defaultProps = {
  classes: [],
  type: 'button',
  onclick: () => {},
};

CreateButton.propTypes = {
  onclick: PropTypes.func,
  classes: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  link: PropTypes.string.isRequired
};

export default CreateButton;
