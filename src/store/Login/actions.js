import { createAction } from 'redux-actions';
import {
  USERNAME_INPUT_VALUE,
  PASSWORD_INPUT_VALUE,
  CLEAR_PASSWORD_VALUE,
  FORM_SUBMIT
} from './types';

export const changeUsernameValue = createAction(USERNAME_INPUT_VALUE, (value) => value);
export const changePasswordValue = createAction(PASSWORD_INPUT_VALUE, (value) => value);
export const clearPassword = createAction(CLEAR_PASSWORD_VALUE);
export const formSubmit = createAction(FORM_SUBMIT);
