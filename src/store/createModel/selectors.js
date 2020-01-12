import { compose, prop } from 'lodash/fp';
import { createSelector } from 'reselect';
import { formatModelItems, getFormattedRelations } from './utils';

const root = (state) => state.createModel;
export const getStep = compose(prop('step'), root);
export const getSelectedConnection = compose(prop('selectedConnection'), root);
export const getSelectedTable = compose(prop('selectedTable'), root);
export const getSelectedTableName = compose(prop('name'), getSelectedTable);
export const getSelectedTableColumns = compose(prop('columns'), getSelectedTable);
export const isSelectedTableAlreadyAdded = compose(prop('alreadyAdded'), getSelectedTable);
export const getTables = compose(prop('tables'), root);
export const getModelItems = compose(prop('modelItems'), root);
export const getRelations = compose(prop('relations'), root);
export const getModelName = compose(prop('name'), root);
export const getUsersWithAccess = compose(prop('usersWithAccess'), root);
export const getModelItemsCount = compose(prop('length'), getModelItems);

export const getSelectedRelations = compose(getFormattedRelations, getRelations);

export const getFormattedModelItems = compose(formatModelItems, getModelItems);

export const getDataForCreatingModel = createSelector(
  getSelectedRelations,
  getFormattedModelItems,
  getSelectedConnection,
  getModelName,
  getUsersWithAccess,
  (relations, items, connectionId, name, users) => ({
    relations,
    items,
    connectionId,
    name,
    users
  }),
);
