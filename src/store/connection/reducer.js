import {
  APPEND_CONNECTIONS,
  FETCH_FAILURE,
  FETCH_START,
  SET_CONNECTIONS,
  SET_TOTAL_CONNECTIONS,
  CHANGE_SEARCH_INPUT,
  CREATE_FAILURE,
  CREATE_START,
  NEXT_PAGE,
  HOST_VALUE,
  PORT_VALUE,
  NAME_DB_VALUE,
  NAME_CONNECTION_VALUE,
  USERNAME_VALUE,
  PASSWORD_VALUE,
  TYPE_VALUE,
} from './types';
import { EMPTY_FIELDS_ERROR } from '../login/types';
import { EMPTY_FIELDS_ERROR_MESSAGE } from '../login/constants';

const initialState = {
  connections: [],
  totalConnections: {
    count: 0,
    isLoading: true
  },
  currentPage: 1,
  search: '',
  itemsPerPage: 6,
  lastLoadedPage: 1,
  error: false,
  isLoading: false,
  hasNextPage: true,
};

export default function connectionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case SET_CONNECTIONS:
      return {
        ...state,
        connections: action.payload,
        error: false,
        isLoading: false
      };
    case APPEND_CONNECTIONS:
      return {
        ...state,
        connections: [...state.connections, ...action.payload],
        hasNextPage: action.payload.length > 0,
        error: false,
        isLoading: false
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    case CREATE_START:
      return {
        ...state,
        isCreatingInProgress: true
      };
    case SET_TOTAL_CONNECTIONS:
      return {
        ...state,
        totalConnections: {
          count: action.payload,
          isLoading: false,
        }
      };
    case CREATE_FAILURE:
      return {
        ...state,
        isCreatingInProgress: false,
        error: true,
      };
    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        search: action.payload,
      };
    case EMPTY_FIELDS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: EMPTY_FIELDS_ERROR_MESSAGE
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
    default:
      return state;
  }
}
