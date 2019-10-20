import {
  USERNAME_INPUT_VALUE,
  PASSWORD_INPUT_VALUE,
  CLEAR_PASSWORD_VALUE,
  FORM_SUBMIT
} from './types';

const initialState = {
  password: '',
  username: '',
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
    default:
      return state;
  }
}
