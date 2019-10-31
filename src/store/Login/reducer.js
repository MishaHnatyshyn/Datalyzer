import {
  USERNAME_INPUT_VALUE,
  PASSWORD_INPUT_VALUE,
  CLEAR_PASSWORD_VALUE,
  FORM_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './types';

const initialState = {
  password: '',
  username: '',
  token: null,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USERNAME_INPUT_VALUE:
      return { ...state, username: action.payload };
    case PASSWORD_INPUT_VALUE:
      return { ...state, password: action.payload };
    case CLEAR_PASSWORD_VALUE:
      return { ...state, password: '' };
    case FORM_SUBMIT:
      return { ...state };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        username: '',
        password: '',
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        password: '',
        error: action.payload.error
      };
    default:
      return state;
  }
}
