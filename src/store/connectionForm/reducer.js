import {
  HOST_VALUE,
  PORT_VALUE,
  NAME_DB_VALUE,
  NAME_CONNECTION_VALUE,
  USERNAME_VALUE,
  PASSWORD_VALUE,
  TYPE_VALUE,
  EMPTY_FIELDS_ERROR,
  APPEND_CONNECTIONS,
  CREATE_FAILURE,
  CREATE_SUCCESS,
  ONCLOSE_ACTION,
  CONNECTION_FOR_EDITING,
  EDIT_SUCCESS,
  SHOW_EDIT,
} from './types';
import { EMPTY_FIELDS_ERROR_MESSAGE } from '../login/constants';

const initialState = {
  error: false,
  isVisible: true,
  host: '',
  port: '',
  username: '',
  password: '',
  type: '',
  nameConnection: '',
  nameDB: '',
  connectionForEditing: null,
};

export default function connectionFormsReducer(state = initialState, action) {
  switch (action.type) {
    case EMPTY_FIELDS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: EMPTY_FIELDS_ERROR_MESSAGE
      };
    case APPEND_CONNECTIONS:
      return {
        ...state,
        error: false,
        isLoading: false,
      };
    case HOST_VALUE:
      return { ...state, host: action.payload, error: false };
    case PORT_VALUE:
      return { ...state, port: action.payload, error: false };
    case NAME_DB_VALUE:
      return { ...state, nameDB: action.payload, error: false };
    case NAME_CONNECTION_VALUE:
      return { ...state, nameConnection: action.payload, error: false };
    case USERNAME_VALUE:
      return { ...state, username: action.payload, error: false };
    case PASSWORD_VALUE:
      return { ...state, password: action.payload, error: false };
    case TYPE_VALUE:
      return { ...state, type: action.payload, error: false };
    case CREATE_FAILURE:
      return {
        ...state,
        isCreatingInProgress: false,
        error: true,
        errorMessage: 'Creation failed'
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        host: '',
        port: '',
        username: '',
        password: '',
        type: '',
        nameConnection: '',
        nameDB: '',
        error: false,
        isLoading: false,
      };
    case ONCLOSE_ACTION:
      return {
        ...state,
        host: '',
        port: '',
        username: '',
        password: '',
        type: '',
        nameConnection: '',
        nameDB: '',
        error: false,
        isLoading: false,
      };
    case CONNECTION_FOR_EDITING:
      return { ...state, connectionForEditing: action.payload, error: false };
    case EDIT_SUCCESS:
      return {
        ...state,
        host: '',
        port: '',
        username: '',
        password: '',
        nameConnection: '',
        nameDB: '',
        error: false,
        isLoading: false,
      };
    case SHOW_EDIT:
      return {
        ...state,
        host: state.connectionForEditing.host,
        port: state.connectionForEditing.port,
        username: state.connectionForEditing.username,
        password: state.connectionForEditing.password,
        nameConnection: state.connectionForEditing.name,
        nameDB: state.connectionForEditing.db_name,
        error: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
