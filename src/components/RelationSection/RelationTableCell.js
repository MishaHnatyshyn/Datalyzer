import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './relationSection.module.scss';

const RelationTableCell = ({ children, classes }) => (
  <div className={classnames(styles.tableCell, classes)}>{children}</div>
);

RelationTableCell.defaultProps = {
  classes: '',
};

RelationTableCell.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.string,
};

export default RelationTableCell;
