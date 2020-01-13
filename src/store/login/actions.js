import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import {
  USERNAME_INPUT_VALUE,
  PASSWORD_INPUT_VALUE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  EMPTY_FIELDS_ERROR,
  REMOVE_TOKEN,
  LOGIN_START,
} from './types';
import { post } from '../../utils/http';
import { LOGIN_ENDPOINT, LOGIN_URL } from '../../config';
import {
  set as setIntoLocalStorage,
  get as getFromLocalStorage,
  remove as removeFromLocalStorage,
} from '../../utils/localStorage';
import { clearUserData, setUserData } from '../user/actions';
import { LOCAL_STORAGE_USER_KEY } from './constants';

export const changeUsernameValue = createAction(USERNAME_INPUT_VALUE, (value) => value);
export const changePasswordValue = createAction(PASSWORD_INPUT_VALUE, (value) => value);
export const loginSuccess = createAction(LOGIN_SUCCESS, (data) => data);
export const loginFailure = createAction(LOGIN_FAILURE);
export const loginStart = createAction(LOGIN_START);
export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);
export const removeToken = createAction(REMOVE_TOKEN);

export const login = () => async (dispatch, getState) => {
  const {
    login: { username: name, password },
  } = getState();

  if (!name || !password) {
    return dispatch(emptyFieldsError());
  }

  dispatch(loginStart());
  try {
    const data = await post(LOGIN_ENDPOINT, { data: { username: name, password } });
    const {
      access_token, username, id, user_type
    } = data;
    setIntoLocalStorage(LOCAL_STORAGE_USER_KEY, {
      access_token,
      username,
      id,
      user_type,
    });
    dispatch(loginSuccess(access_token));
    dispatch(setUserData({ username, userId: id, userType: user_type.name }));
  } catch (e) {
    console.log(e);
    dispatch(loginFailure());
  }
};

export const checkAuthStatus = () => (dispatch) => {
  const data = getFromLocalStorage(LOCAL_STORAGE_USER_KEY);
  if (!data) return dispatch(push(LOGIN_URL));
  const {
    access_token, username, id, user_type
  } = data;

  dispatch(setUserData({ username, userId: id, userType: user_type.name }));
  dispatch(loginSuccess(access_token));
};

export const logout = () => (dispatch) => {
  removeFromLocalStorage(LOCAL_STORAGE_USER_KEY);
  dispatch(removeToken());
  dispatch(clearUserData());
};
