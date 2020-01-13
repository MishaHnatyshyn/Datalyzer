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
  FETCH_COUNT_START,
  FETCH_COUNT_FAILURE,
  DELETE_CONNECTION,
  DELETE_CONNECTION_SUCCESS,
  CREATE_SUCCESS,
} from './types';
import { EDIT_SUCCESS } from '../connectionForm/types';

const initialState = {
  connections: [],
  totalConnections: {
    count: 0,
    isLoading: true,
  },
  currentPage: 1,
  search: '',
  itemsPerPage: 6,
  lastLoadedPage: 1,
  error: false,
  isLoading: false,
  hasNextPage: true,
  connectionForDeleting: null,
};

export default function connectionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNT_START:
      return {
        ...state,
        totalConnections: {
          isLoading: true,
        },
      };
    case FETCH_COUNT_FAILURE:
      return {
        ...state,
        totalConnections: {
          count: 0,
          isLoading: false,
        },
      };
    case SET_TOTAL_CONNECTIONS:
      return {
        ...state,
        totalConnections: {
          count: action.payload,
          isLoading: false,
        },
      };
    case FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case SET_CONNECTIONS:
      return {
        ...state,
        connections: action.payload,
        error: false,
        isLoading: false,
      };
    case APPEND_CONNECTIONS:
      return {
        ...state,
        connections: [action.payload, ...state.connections],
        hasNextPage: action.payload.length > 0,
        error: false,
        isLoading: false,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        connections: [action.payload, ...state.connections],
        totalConnections: {
          count: state.totalConnections.count + 1,
          isLoading: false
        },
        error: false,
        isLoading: false,
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case CREATE_START:
      return {
        ...state,
        isCreatingInProgress: true,
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
    case DELETE_CONNECTION:
      return {
        ...state,
        connectionForDeleting: action.payload,
      };
    case DELETE_CONNECTION_SUCCESS:
      return {
        ...state,
        totalConnections: {
          count: state.totalConnections.count - 1,
          isLoading: false
        },
        connections: state.connections.filter(
          (connection) => connection.id !== state.connectionForDeleting,
        ),
        connectionForDeleting: null,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        connections: state.connections.map(
          (connection) => connection.id === action.payload.id ? { ...connection, ...action.payload } : connection
        ),
      };
    default:
      return state;
  }
}
