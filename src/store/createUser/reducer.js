import {
  SET_USERS,
  CREATE_SUCCESS,
  CREATE_START,
  CREATE_FAILURE,
  FORM_USER_TYPE_INPUT_VALUE,
  FORM_DESCRIPTION_INPUT_VALUE,
  FORM_USERNAME_INPUT_VALUE,
  FORM_PASSWORD_INPUT_VALUE,
  FORM_PASSWORD_REPEAT_INPUT_VALUE,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_EQUAL_ERROR,
  EMPTY_FIELDS_ERROR,
  CLOSE_ACTION,
} from './types';
import { EMPTY_FIELDS_ERROR_MESSAGE } from '../login/constants';
import { PASS_LENGTH_ERROR_MESSAGE, PASS_EQUAL_ERROR_MESSAGE } from './constants';

const initialState = {
  totalUsers: {
    count: 0,
    isLoading: true
  },
  currentPage: 1,
  search: '',
  itemsPerPage: 4,
  lastLoadedPage: 1,
  error: false,
  isLoading: false,
  hasNextPage: true,
  users: [],
  formUsername: '',
  formPassword: '',
  formPasswordRepeat: '',
  formUserType: '',
  formDescription: '',
  isCreatingInProgress: false,
  isVisible: true,
};

export default function createUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        error: false,
        isLoading: false
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
        errorMessage: 'Creation failed'
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        isCreatingInProgress: false,
        formUsername: '',
        formPassword: '',
        formPasswordRepeat: '',
        formUserType: '',
        formDescription: '',
        isError: false,
      };
    case FORM_USERNAME_INPUT_VALUE:
      return { ...state, formUsername: action.payload, error: false };
    case FORM_PASSWORD_INPUT_VALUE:
      return { ...state, formPassword: action.payload, error: false };
    case FORM_PASSWORD_REPEAT_INPUT_VALUE:
      return { ...state, formPasswordRepeat: action.payload, error: false };
    case FORM_DESCRIPTION_INPUT_VALUE:
      return { ...state, formDescription: action.payload, error: false };
    case FORM_USER_TYPE_INPUT_VALUE:
      return { ...state, formUserType: action.payload, error: false };
    case PASSWORD_EQUAL_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: PASS_EQUAL_ERROR_MESSAGE,
      };
    case PASSWORD_LENGTH_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: PASS_LENGTH_ERROR_MESSAGE,
      };
    case EMPTY_FIELDS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: EMPTY_FIELDS_ERROR_MESSAGE,
      };
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
