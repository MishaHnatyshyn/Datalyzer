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
  USER_FOR_EDITING,
  EDIT_SUCCESS,
  SHOW_EDIT,
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
        userForEditing: null,
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
        formUsername: '',
        formUserType: '',
        formDescription: '',
      };
    case SHOW_EDIT:
      return {
        ...state,
        isCreatingInProgress: false,
        isError: false,
        formUsername: state.userForEditing.username,
        formDescription: state.userForEditing.description,
        formUserType: state.userForEditing.user_type_id.toString(),
      };
    default:
      return state;
  }
}
