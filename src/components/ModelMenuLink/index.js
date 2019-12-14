import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './modelMenuLink.module.scss';

const ModelMenuLink = ({ children, onClick }) => (
  <div className={styles.container} onClick={onClick}>
    <p className={styles.text}>{children}</p>
    <img src="/images/back.png" alt="arrow right" />
  </div>
);

ModelMenuLink.defaultProps = {
  onClick: () => {}
};

ModelMenuLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

export default ModelMenuLink;
