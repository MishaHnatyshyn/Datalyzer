import { createAction } from 'redux-actions';
import {
  SET_USERS,
  CREATE_FAILURE,
  CREATE_START,
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
import { post } from '../../utils/http';
import { ADMIN_USERS_ENDPOINT } from '../../config';


export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);
export const createUserFailure = createAction(CREATE_FAILURE);
export const createUserStart = createAction(CREATE_START);
export const setUsers = createAction(SET_USERS, (users) => users);
export const passwordLengthError = createAction(PASSWORD_LENGTH_ERROR, (value) => value);
export const passwordEqualError = createAction(PASSWORD_EQUAL_ERROR, (value) => value);
export const changeUserTypeValue = createAction(FORM_USER_TYPE_INPUT_VALUE, (object) => object.target.value);
export const changeUsernameValue = createAction(FORM_USERNAME_INPUT_VALUE, (value) => value);
export const changePasswordValue = createAction(FORM_PASSWORD_INPUT_VALUE, (value) => value);
export const changeUserDescriptionValue = createAction(FORM_DESCRIPTION_INPUT_VALUE, (value) => value);
export const changePasswordRepeatValue = createAction(FORM_PASSWORD_REPEAT_INPUT_VALUE, (value) => value);
export const onCloseAction = createAction(CLOSE_ACTION);

export const showCreateUserPopup = () => {};

export const newUser = () => async (dispatch, getState) => {
  const {
    createUser: {
      formUserType,
      formDescription,
      formPasswordRepeat,
      formUsername,
      formPassword,
    }
  } = getState();
  if (!formUsername || !formPassword || !formUserType || !formPasswordRepeat) {
    return dispatch(emptyFieldsError());
  }
  if (formPassword.length < 6) {
    return dispatch(passwordLengthError());
  }
  if (formPassword !== formPasswordRepeat) {
    return dispatch(passwordEqualError());
  }
  dispatch(createUserStart());
  try {
    const data = await post(ADMIN_USERS_ENDPOINT, {
      data: {
        username: formUsername,
        password: formPassword,
        user_type_id: Number(formUserType),
        description: formDescription,
      }
    });
    dispatch(setUsers(data));
  } catch (e) {
    dispatch(createUserFailure());
  }
};
