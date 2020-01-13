import { createAction } from 'redux-actions';
import {
  NEXT_STEP,
  PREV_STEP,
  SELECTED_CONNECTION,
  SELECTED_TABLE,
  CLEAR_SELECTED_TABLE,
  ADD_TABLE_IN_MODEL,
  CHANGE_COLUMN_NAME,
  CHANGE_TABLE_NAME,
  CHANGE_COLUMN_TYPE,
  CHANGE_COLUMN_INCLUDE_VALUE,
  EDIT_MODEL_ITEM,
  CANCEL_EDITING_MODEL_ITEM,
  CANCEL_ADDING_TABLE_IN_MODEL,
  REMOVE_TABLE_FROM_MODEL,
  FETCH_CONNECTION_TABLES_START,
  FETCH_CONNECTION_TABLES_ERROR,
  SET_CONNECTION_TABLES_DATA,
  TOGGLE_RELATION,
  FETCH_CONNECTION_RELATIONS_SUCCESS,
  FETCH_CONNECTION_RELATIONS_START,
  CREATE_MODEL_ERROR,
  CREATE_MODEL_START,
  CREATE_MODEL_SUCCESS,
  CHANGE_MODEL_NAME,
  RESET_CREATE_MODEL_STATE,
  TOGGLE_USER_WITH_ACCESS,
  DESELECT_ALL_USERS_WITH_ACCESS,
  SELECT_ALL_USERS_WITH_ACCESS,
} from './types';
import {
  getDataForCreatingModel,
  getModelItems,
  getRelations,
  getSelectedConnection,
  getTables,
} from './selectors';
import { get, post } from '../../utils/http';
import {
  createConnectionRelationsDataRoute,
  createConnectionTablesDataRoute,
} from '../../utils/routeCreators';
import { ADMIN_MODELS_ENDPOINT } from '../../config';
import { displayCustomPopup } from '../popups/actions';
import PopupTypes from '../popups/popupTypes';

export const nextStep = createAction(NEXT_STEP);
export const prevStep = createAction(PREV_STEP);
export const setSelectedConnection = createAction(
  SELECTED_CONNECTION,
  (connection_id) => connection_id,
);
export const setSelectedTable = createAction(SELECTED_TABLE, (table) => table);
export const clearSelectedTable = createAction(CLEAR_SELECTED_TABLE);
export const editModelItem = createAction(EDIT_MODEL_ITEM, (table) => table);
export const cancelAddingTable = createAction(CANCEL_ADDING_TABLE_IN_MODEL);
export const cancelEditingModelItem = createAction(CANCEL_EDITING_MODEL_ITEM);
export const addTableInModel = createAction(ADD_TABLE_IN_MODEL);
export const toggleUserWithAccess = createAction(TOGGLE_USER_WITH_ACCESS, (index) => (index));
export const selectAllUsersWithAccess = createAction(SELECT_ALL_USERS_WITH_ACCESS);
export const deselectAllUserWithAccess = createAction(DESELECT_ALL_USERS_WITH_ACCESS);
export const changeColumnName = createAction(CHANGE_COLUMN_NAME, (target, value) => ({
  target,
  value,
}));
export const changeTableName = createAction(CHANGE_TABLE_NAME, (value) => value);
export const changeColumnType = createAction(CHANGE_COLUMN_TYPE, (target, value) => ({
  target,
  value,
}));
export const changeColumnIncludeValue = createAction(
  CHANGE_COLUMN_INCLUDE_VALUE,
  (target, value) => ({
    target,
    value,
  }),
);
export const removeTableFromModel = createAction(
  REMOVE_TABLE_FROM_MODEL,
  (originalTableData) => originalTableData,
);
export const fetchConnectionTablesStart = createAction(FETCH_CONNECTION_TABLES_START);
export const fetchConnectionTablesError = createAction(FETCH_CONNECTION_TABLES_ERROR);
export const setConnectionTablesData = createAction(SET_CONNECTION_TABLES_DATA, (tables) => tables);
export const toggleRelation = createAction(TOGGLE_RELATION, (index, value) => ({ index, value }));

export const fetchConnectionRelationsStart = createAction(FETCH_CONNECTION_RELATIONS_START);
export const fetchConnectionRelationsError = createAction(FETCH_CONNECTION_RELATIONS_START);
export const fetchConnectionRelationsSuccess = createAction(FETCH_CONNECTION_RELATIONS_SUCCESS);

export const createModelStart = createAction(CREATE_MODEL_START);
export const createModelError = createAction(CREATE_MODEL_ERROR, (text) => text);
export const createModelSuccess = createAction(CREATE_MODEL_SUCCESS, (model) => model);
export const changeModelName = createAction(CHANGE_MODEL_NAME, (value) => value);
export const resetCreateModelState = createAction(RESET_CREATE_MODEL_STATE);

export const fetchConnectionTablesData = () => async (dispatch, getState) => {
  const state = getState();
  const currentTables = getTables(state);
  if (currentTables && currentTables.length) {
    return;
  }
  const connectionId = getSelectedConnection(state);
  const url = createConnectionTablesDataRoute(connectionId);
  try {
    dispatch(fetchConnectionTablesStart());
    const data = await get(url);
    dispatch(setConnectionTablesData(data));
  } catch (e) {
    dispatch(fetchConnectionTablesError(e));
  }
};

export const fetchConnectionRelationsData = () => async (dispatch, getState) => {
  const state = getState();
  const currentRelations = getRelations(state);
  if (currentRelations && currentRelations.length) {
    return;
  }
  const connectionId = getSelectedConnection(state);
  const tablesIncludedInModel = getModelItems(state).map((_) => _.originalData.tableName);
  const url = createConnectionRelationsDataRoute(connectionId);
  try {
    dispatch(fetchConnectionRelationsStart());
    const data = await get(url);
    const relations = data.map((item) => ({
      ...item,
      include:
        tablesIncludedInModel.includes(item.foreignTable)
        && tablesIncludedInModel.includes(item.primaryTable),
    }));
    dispatch(fetchConnectionRelationsSuccess(relations));
  } catch (e) {
    dispatch(fetchConnectionRelationsError(e));
  }
};

export const createModel = () => async (dispatch, getState) => {
  const state = getState();
  const createModelDto = getDataForCreatingModel(state);
  try {
    dispatch(createModelStart());
    const data = await post(ADMIN_MODELS_ENDPOINT, { data: createModelDto });
    dispatch(createModelSuccess(data));
    dispatch(displayCustomPopup(PopupTypes.CREATE_MODEL_SUCCESS));
  } catch (e) {
    dispatch(createModelError(e));
    dispatch(displayCustomPopup(PopupTypes.CREATE_MODEL_ERROR));
  }
};
