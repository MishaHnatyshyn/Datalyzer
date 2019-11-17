import { createAction } from 'redux-actions';
import {
  CHANGE_FORM_FIELD,
  FETCH_FAILURE,
  FETCH_START,
  SET_USERS,
  APPEND_USERS,
  NEXT_PAGE,
  PREV_PAGE,
  SET_TOTAL_USERS,
  CREATE_FAILURE,
  CREATE_START,
  CREATE_SUCCESS,
  CHANGE_SEARCH_INPUT,
  FORM_USER_TYPE_INPUT_VALUE,
  FORM_DESCRIPTION_INPUT_VALUE,
  FORM_USERNAME_INPUT_VALUE,
  FORM_PASSWORD_INPUT_VALUE,
  FORM_PASSWORD_REPEAT_INPUT_VALUE,
} from './types';
import { getPaging, getUsersSearchPayload } from './selectors';
import { get, post } from '../../utils/http';
import { ADMIN_USERS_COUNT_ENDPOINT, ADMIN_USERS_ENDPOINT, LOGIN_ENDPOINT } from '../../config';
import { set as setIntoLocalStorage } from '../../utils/localStorage';
import { LOCAL_STORAGE_USER_KEY } from '../login/constants';
import { setUserData } from '../user/actions';
import { emptyFieldsError, loginFailure, loginSuccess } from '../login/actions';
import { compose, prop } from 'lodash/fp';
import { USERNAME_INPUT_VALUE } from '../login/types';

export const changeInputField = createAction(
  CHANGE_FORM_FIELD,
  (field, value) => ({ field, value })
);
export const fetchStart = createAction(FETCH_START);
export const fetchFailure = createAction(FETCH_FAILURE);
export const nextPage = createAction(NEXT_PAGE);
export const prevPage = createAction(PREV_PAGE);
export const setTotalUsers = createAction(SET_TOTAL_USERS, (count) => count);
export const createUserFailure = createAction(CREATE_FAILURE);
export const createUserStart = createAction(CREATE_START);
export const createUserSuccess = createAction(CREATE_SUCCESS, (user) => user);
export const setUsers = createAction(SET_USERS, (users) => users);
export const appendUsers = createAction(APPEND_USERS, (users) => users);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (value) => value);
export const getUserTypeValue = createAction(FORM_USER_TYPE_INPUT_VALUE, (object) => object.value);
export const getUsernameValue = createAction(FORM_USERNAME_INPUT_VALUE, (value) => value);
export const getPasswordValue = createAction(FORM_PASSWORD_INPUT_VALUE, (value) => value);
export const getUserDescriptionValue = createAction(FORM_DESCRIPTION_INPUT_VALUE, (value) => value);
export const getPasswordRepeatValue = createAction(FORM_PASSWORD_REPEAT_INPUT_VALUE, (value) => value);

export const searchUsers = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage, search } = getUsersSearchPayload(getState());
  const params = { currentPage, itemsPerPage };
  if (search) params.search = search;
  dispatch(fetchStart());
  try {
    const data = await get(ADMIN_USERS_ENDPOINT, { params });
    dispatch(setUsers(data));
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const fetchNextPage = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage, search } = getUsersSearchPayload(getState());
  const params = { currentPage: currentPage + 1, itemsPerPage };
  if (search) params.search = search;
  dispatch(fetchStart());
  try {
    const data = await get(ADMIN_USERS_ENDPOINT, { params });
    dispatch(appendUsers(data));
    dispatch(nextPage());
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const moveToNextPage = () => (dispatch, getState) => {
  const { lastLoadedPage, currentPage } = getPaging(getState());
  if (currentPage === lastLoadedPage) return dispatch(fetchNextPage());
  dispatch(nextPage());
};

export const getUsersCount = () => async (dispatch) => {
  try {
    const data = await get(ADMIN_USERS_COUNT_ENDPOINT);
    dispatch(setTotalUsers(data.count));
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const newUser = () => async (dispatch, getState) => {
  // const { login: { username: name, password } } = getState();
  //
  // if (!name || !password) {
  //   return dispatch(emptyFieldsError());
  // }
  //
  // try {
  //   const data = await post(LOGIN_ENDPOINT, { username: name, password });
  //   const {
  //     access_token, username, id, user_type
  //   } = data;
  //   setIntoLocalStorage(LOCAL_STORAGE_USER_KEY, {
  //     access_token, username, id, user_type
  //   });
  //   dispatch(loginSuccess(access_token));
  //   dispatch(setUserData({ username, userId: id, userType: user_type.name }));
  // } catch (e) {
  //   dispatch(loginFailure());
  // }
};
