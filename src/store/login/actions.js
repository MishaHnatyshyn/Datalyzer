import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import {
  USERNAME_INPUT_VALUE,
  PASSWORD_INPUT_VALUE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  EMPTY_FIELDS_ERROR
} from './types';
import { post } from '../../utils/http';
import { LOGIN_ENDPOINT, LOGIN_URL } from '../../config';
import { set as setIntoLocalStorage, get as getFromLocalStorage } from '../../utils/localStorage';
import { setUserData } from '../user/actions';
import { createHomeRoute } from '../../utils/routeCreators';

export const changeUsernameValue = createAction(USERNAME_INPUT_VALUE, (value) => value);
export const changePasswordValue = createAction(PASSWORD_INPUT_VALUE, (value) => value);
export const loginSuccess = createAction(LOGIN_SUCCESS, (data) => data);
export const loginFailure = createAction(LOGIN_FAILURE);
export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);

export const login = () => (dispatch, getState) => {
  const { login: { username, password } } = getState();

  if (!username || !password) return dispatch(emptyFieldsError());

  post(LOGIN_ENDPOINT, {
    username, password
  })
    .then((data) => {
      const {
        // eslint-disable-next-line camelcase
        access_token, username, id, user_type
      } = data;
      setIntoLocalStorage('datalyzer_user', {
        access_token, username, id, user_type
      });
      dispatch(loginSuccess({ token: access_token }));
      dispatch(setUserData({ username, userId: id, userType: user_type.name }));
      dispatch(push(createHomeRoute(user_type.name)));
    })
    .catch(() => {
      dispatch(loginFailure());
    });
};

export const checkAuthStatus = () => (dispatch) => {
  const data = getFromLocalStorage('datalyzer_user');
  if (!data) return dispatch(push(LOGIN_URL));
  const {
    // eslint-disable-next-line camelcase
    access_token, username, id, user_type
  } = data;
  dispatch(loginSuccess({ token: access_token }));
  dispatch(setUserData({ username, userId: id, userType: user_type.name }));
};

export const redirectToHomeIfIsAuthorized = () => (dispatch, getState) => {
  const { login: { token }, user: { userType } } = getState();
  if (!token) return;
  dispatch(push(createHomeRoute(userType)));
};
