import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './relationSection.module.scss';

const RelationTableRow = ({ children, classes }) => (
  <div className={classnames(styles.tableRow, classes)}>{children}</div>
);

RelationTableRow.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.string.isRequired,
};

export default RelationTableRow;
