import {
  HOST_VALUE,
  PORT_VALUE,
  NAME_DB_VALUE,
  NAME_CONNECTION_VALUE,
  USERNAME_VALUE,
  PASSWORD_VALUE,
  TYPE_VALUE,
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

export default function connectionFormsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CONNECTION_POPUP:
      return {
        ...state,
        isVisible: true
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
    case CLOSE_ACTION:
      return {
        ...state,
        isCreatingInProgress: false,
        formUsername: '',
        formPassword: '',
        formPasswordRepeat: '',
        formUserType: '',
        formDescription: '',
        error: false,
        isVisible: false,
      };
    default:
      return state;
  }
}
