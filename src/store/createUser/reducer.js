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
  ONCLOSE_ACTION,
  NEW_USERNAME_INPUT_VALUE,
  NEW_USERTYPE_INPUT_VALUE,
  NEW_DESCRIPTION_INPUT_VALUE, USER_FOR_EDITING,
  EDIT_SUCCESS,
} from './types';
import { EMPTY_FIELDS_ERROR_MESSAGE } from '../login/constants';
import { PASS_LENGTH_ERROR_MESSAGE, PASS_EQUAL_ERROR_MESSAGE } from './constants';

const initialState = {
  totalUsers: {
    count: 0,
    isLoading: true
  },
  error: false,
  users: [],
  formUsername: '',
  formPassword: '',
  formPasswordRepeat: '',
  formUserType: '',
  formDescription: '',
  newUsername: '',
  newUserType: '',
  newDescription: '',
  userForEditing: null,
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
        isCreatingInProgress: false,
        formUsername: '',
        formPassword: '',
        formPasswordRepeat: '',
        formUserType: '',
        formDescription: '',
        isError: false,
      };
    case FORM_USERNAME_INPUT_VALUE:
      return {
        ...state, formUsername: action.payload, errorMessage: '', error: false
      };
    case FORM_PASSWORD_INPUT_VALUE:
      return {
        ...state, formPassword: action.payload, errorMessage: '', error: false
      };
    case FORM_PASSWORD_REPEAT_INPUT_VALUE:
      return {
        ...state, formPasswordRepeat: action.payload, errorMessage: '', error: false
      };
    case FORM_DESCRIPTION_INPUT_VALUE:
      return {
        ...state, formDescription: action.payload, errorMessage: '', error: false
      };
    case FORM_USER_TYPE_INPUT_VALUE:
      return {
        ...state, formUserType: action.payload, errorMessage: '', error: false
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
    case ONCLOSE_ACTION:
      return {
        ...state,
        isCreatingInProgress: false,
        formUsername: '',
        formPassword: '',
        formPasswordRepeat: '',
        formUserType: '',
        formDescription: '',
        isError: false,
        newUsername: '',
        newUserType: '',
        newDescription: '',
        userForEditing: null,
      };
    case NEW_USERNAME_INPUT_VALUE:
      return {
        ...state, newUsername: action.payload, errorMessage: '', error: false
      };
    case NEW_USERTYPE_INPUT_VALUE:
      return {
        ...state, newUserType: action.payload, errorMessage: '', error: false
      };
    case NEW_DESCRIPTION_INPUT_VALUE:
      return {
        ...state, newDescription: action.payload, errorMessage: '', error: false
      };
    case USER_FOR_EDITING:
      return {
        ...state, userForEditing: action.payload, errorMessage: '', error: false
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        isCreatingInProgress: false,
        isError: false,
        newUsername: '',
        newUserType: '',
        newDescription: '',
      };
    default:
      return state;
  }
}
