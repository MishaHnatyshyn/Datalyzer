import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './createButton.module.scss';

const CreateButton = ({
  onclick, classes, children, type
}) => (
  <button type={type} onClick={onclick} className={classnames(styles.buttonCommon, ...classes)}>
    {children}
    <img src="/images/plus.png" alt="create" className={styles.plusIcon} />
  </button>
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
};

export default CreateButton;
