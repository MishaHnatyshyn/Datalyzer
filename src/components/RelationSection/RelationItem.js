import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import RelationTableRow from './RelationTableRow';
import RelationTableCell from './RelationTableCell';
import Checkbox from '../Checkbox';
import styles from './relationSection.module.scss';

const RelationItem = ({
  foreignTable,
  fkColumn,
  primaryTable,
  pkColumn,
  index,
  include,
  toggleRelation,
}) => {
  const handleClick = useCallback(() => {
    toggleRelation(index);
  }, [index]);
  return (
    <RelationTableRow classes={styles.text}>
      <RelationTableCell>{index + 1}</RelationTableCell>
      <RelationTableCell>{foreignTable}</RelationTableCell>
      <RelationTableCell>{fkColumn}</RelationTableCell>
      <RelationTableCell>{primaryTable}</RelationTableCell>
      <RelationTableCell>{pkColumn}</RelationTableCell>
      <RelationTableCell>
        <Checkbox include={include} onIncludeChange={handleClick} />
      </RelationTableCell>
    </RelationTableRow>
  );
};

RelationItem.propTypes = {
  foreignTable: PropTypes.string.isRequired,
  fkColumn: PropTypes.string.isRequired,
  primaryTable: PropTypes.string.isRequired,
  pkColumn: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  include: PropTypes.bool.isRequired,
  toggleRelation: PropTypes.func.isRequired,
};

export default RelationItem;
