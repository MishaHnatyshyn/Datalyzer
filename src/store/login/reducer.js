import {
  USERNAME_INPUT_VALUE,
  PASSWORD_INPUT_VALUE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  EMPTY_FIELDS_ERROR,
  LOGIN_START,
} from './types';
import { EMPTY_FIELDS_ERROR_MESSAGE, LOGIN_ERROR_MESSAGE } from './constants';

const initialState = {
  password: '',
  username: '',
  token: '',
  isLoading: false,
  error: false,
  errorMessage: ''
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USERNAME_INPUT_VALUE:
      return { ...state, username: action.payload, error: false };
    case PASSWORD_INPUT_VALUE:
      return { ...state, password: action.payload, error: false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        username: '',
        password: '',
        error: false,
        isLoading: false,
      };
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        password: '',
        error: true,
        isLoading: false,
        errorMessage: LOGIN_ERROR_MESSAGE
      };
    case EMPTY_FIELDS_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: EMPTY_FIELDS_ERROR_MESSAGE
      };
    default:
      return state;
  }
}
