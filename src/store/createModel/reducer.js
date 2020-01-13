import {
  NEXT_STEP,
  PREV_STEP,
  SELECTED_CONNECTION,
  SELECTED_TABLE,
  ADD_TABLE_IN_MODEL,
  CHANGE_COLUMN_NAME,
  CHANGE_COLUMN_TYPE,
  CHANGE_COLUMN_INCLUDE_VALUE,
  CHANGE_TABLE_NAME,
  CANCEL_ADDING_TABLE_IN_MODEL,
  CANCEL_EDITING_MODEL_ITEM,
  EDIT_MODEL_ITEM,
  REMOVE_TABLE_FROM_MODEL,
  SET_CONNECTION_TABLES_DATA,
  TOGGLE_RELATION,
  FETCH_CONNECTION_RELATIONS_SUCCESS,
  CHANGE_MODEL_NAME,
  RESET_CREATE_MODEL_STATE,
  TOGGLE_USER_WITH_ACCESS,
  SELECT_ALL_USERS_WITH_ACCESS,
  DESELECT_ALL_USERS_WITH_ACCESS,
} from './types';

const initialState = {
  name: '',
  step: 1,
  selectedConnection: null,
  selectedTable: null,
  modelItems: [],
  tables: [],
  relations: [],
  usersWithAccess: [],
};

export default function createModelReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODEL_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case TOGGLE_RELATION: {
      return {
        ...state,
        relations: state.relations.map((relation, index) => (index === action.payload.index
          ? { ...relation, include: action.payload.value }
          : relation),),
      };
    }
    case FETCH_CONNECTION_RELATIONS_SUCCESS:
      return {
        ...state,
        relations: action.payload,
      };
    case NEXT_STEP:
      return {
        ...state,
        step: state.step + 1,
      };
    case PREV_STEP:
      return {
        ...state,
        step: state.step - 1,
      };
    case SELECTED_CONNECTION:
      return {
        ...state,
        selectedConnection: action.payload,
        selectedTable: null,
        modelItems: [],
        tables: [],
      };
    case SET_CONNECTION_TABLES_DATA:
      return {
        ...state,
        tables: action.payload,
      };
    case SELECTED_TABLE:
      return {
        ...state,
        selectedTable: {
          originalData: action.payload,
          name: action.payload.tableName,
          columns: action.payload.columns.map((column) => ({
            originalName: column.name,
            givenName: column.name,
            type: 'dimension',
            isNumeric: column.isNumeric,
            include: true,
          })),
          alreadyAdded: false,
        },
        tables: state.tables.filter((table) => table.tableName !== action.payload.tableName),
      };
    case REMOVE_TABLE_FROM_MODEL:
      return {
        ...state,
        tables: state.tables.concat(action.payload),
        modelItems: state.modelItems.filter(
          (table) => table.originalData.tableName !== action.payload.tableName,
        ),
      };
    case EDIT_MODEL_ITEM:
      return {
        ...state,
        selectedTable: {
          ...action.payload,
          originalEditedData: action.payload,
        },
        modelItems: state.modelItems.filter(
          (table) => table.originalData.tableName !== action.payload.originalData.tableName,
        ),
      };
    case CANCEL_ADDING_TABLE_IN_MODEL:
      return {
        ...state,
        selectedTable: null,
        tables: state.tables.concat(state.selectedTable.originalData),
      };
    case CANCEL_EDITING_MODEL_ITEM:
      return {
        ...state,
        selectedTable: null,
        modelItems: state.modelItems.concat(state.selectedTable.originalEditedData),
      };
    case ADD_TABLE_IN_MODEL:
      return {
        ...state,
        modelItems: state.modelItems.concat({
          ...state.selectedTable,
          alreadyAdded: true,
          originalEditedData: null,
        }),
        selectedTable: null,
      };
    case CHANGE_COLUMN_NAME:
      return {
        ...state,
        selectedTable: {
          ...state.selectedTable,
          columns: state.selectedTable.columns.map(
            (column) => (column.originalName === action.payload.target
              ? { ...column, givenName: action.payload.value }
              : column),
          ),
        },
      };
    case CHANGE_COLUMN_TYPE:
      return {
        ...state,
        selectedTable: {
          ...state.selectedTable,
          columns: state.selectedTable.columns.map(
            (column) => (column.originalName === action.payload.target
              ? { ...column, type: action.payload.value }
              : column),
          ),
        },
      };
    case CHANGE_COLUMN_INCLUDE_VALUE:
      return {
        ...state,
        selectedTable: {
          ...state.selectedTable,
          columns: state.selectedTable.columns.map(
            (column) => (column.originalName === action.payload.target
              ? { ...column, include: action.payload.value }
              : column),
          ),
        },
      };
    case CHANGE_TABLE_NAME:
      return {
        ...state,
        selectedTable: {
          ...state.selectedTable,
          name: action.payload,
        },
      };
    case RESET_CREATE_MODEL_STATE:
      return initialState;
    case TOGGLE_USER_WITH_ACCESS:
      return {
        ...state,
        usersWithAccess: state.usersWithAccess.includes(action.payload)
          ? state.usersWithAccess.filter((user) => user !== action.payload)
          : [...state.usersWithAccess, action.payload],
      };
    case SELECT_ALL_USERS_WITH_ACCESS:
      return {
        ...state,
        usersWithAccess: [],
      };
    case DESELECT_ALL_USERS_WITH_ACCESS:
      return {
        ...state,
        usersWithAccess: [],
      };
    default:
      return state;
  }
}
