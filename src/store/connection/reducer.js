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
  FETCH_COUNT_START,
  FETCH_COUNT_FAILURE,
  SHOW_CONNECTION_POPUP,
} from './types';
import { EMPTY_FIELDS_ERROR } from '../login/types';
import { EMPTY_FIELDS_ERROR_MESSAGE } from '../login/constants';
import { CLOSE_ACTION } from '../adminUsers/types';

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
  isVisible: true,
};

export default function connectionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNT_START:
      return {
        ...state,
        totalConnections: {
          isLoading: true
        }
      };
    case FETCH_COUNT_FAILURE:
      return {
        ...state,
        totalConnections: {
          count: 0,
          isLoading: false
        }
      };
    case SET_TOTAL_CONNECTIONS:
      return {
        ...state,
        totalConnections: {
          count: action.payload,
          isLoading: false
        }
      };
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
    case CREATE_FAILURE:
      return {
        ...state,
        isCreatingInProgress: false,
        error: true,
        errorMessage: 'Creation failed',
      };
    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}
