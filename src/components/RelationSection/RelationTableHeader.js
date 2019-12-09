import React from 'react';
import RelationTableRow from './RelationTableRow';
import RelationTableCell from './RelationTableCell';
import styles from './relationSection.module.scss';

const RelationTableHeader = () => (
  <RelationTableRow classes={styles.caption}>
    <RelationTableCell>#</RelationTableCell>
    <RelationTableCell>Foreign table</RelationTableCell>
    <RelationTableCell>Foreign key column</RelationTableCell>
    <RelationTableCell>Primary table</RelationTableCell>
    <RelationTableCell>Primary key column</RelationTableCell>
    <RelationTableCell>Included</RelationTableCell>
  </RelationTableRow>
);

export default RelationTableHeader;
