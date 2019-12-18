import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  OLD_PASSWORD_VALUE,
  PASSWORD_REPEAT_VALUE,
  PASSWORD_VALUE,
  PASSWORD_EQUAL_ERROR,
  PASSWORD_LENGTH_ERROR,
  EMPTY_FIELDS_ERROR,
  ONCLOSE_ACTION,
} from './types';
import { PASS_EQUAL_ERROR_MESSAGE, PASS_LENGTH_ERROR_MESSAGE } from '../createUser/constants';
import { EMPTY_FIELDS_ERROR_MESSAGE } from '../login/constants';
import { CREATE_FAILURE, CREATE_START, CREATE_SUCCESS } from '../createUser/types';

const initialState = {
  username: '',
  userType: '',
  userId: null,
  password: '',
  oldPassword: '',
  passwordRepeat: '',
  error: false,
  errorMessage: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      };
    case PASSWORD_VALUE:
      return {
        ...state, password: action.payload, errorMessage: '', error: false
      };
    case PASSWORD_REPEAT_VALUE:
      return {
        ...state, passwordRepeat: action.payload, errorMessage: '', error: false
      };
    case OLD_PASSWORD_VALUE:
      return {
        ...state, oldPassword: action.payload, errorMessage: '', error: false
      };
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
    case CLEAR_USER_DATA:
      return initialState;
    case ONCLOSE_ACTION:
      return {
        ...state,
        password: '',
        oldPassword: '',
        passwordRepeat: '',
        error: false,
        errorMessage: '',
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
        password: '',
        oldPassword: '',
        passwordRepeat: '',
        error: false,
        errorMessage: '',
      };
    default:
      return state;
  }
}
