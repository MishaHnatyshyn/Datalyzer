import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import spinner from './spinner.png';
import styles from './loader.module.scss';

export default function Loader({ classes }) {
  return (
    <div className={classnames(styles.loader, classes)}>
      <img src={spinner} alt="spinner" />
    </div>
  );
}

Loader.defaultProps = {
  classes: '',
};

Loader.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
