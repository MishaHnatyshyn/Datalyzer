import {
  compose, prop, filter, map
} from 'lodash/fp';

export const filterByIncludeField = prop('include');

export const formatRelation = ({
  foreignTable, fkColumn, primaryTable, pkColumn
}) => ({
  firstTableName: foreignTable,
  firstTableColumn: fkColumn,
  secondTableName: primaryTable,
  secondTableColumn: pkColumn,
});

export const getFormattedRelations = compose(map(formatRelation), filter(filterByIncludeField));

export const formatRows = ({ originalName, givenName, type }) => ({
  originalName,
  givenName,
  type,
});

export const getFormattedRows = compose(map(formatRows), filter(filterByIncludeField));

export const formatModelItems = map(({ name, originalData: { tableName }, columns }) => ({
  tableName,
  name,
  rows: getFormattedRows(columns),
}));
