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
  FETCH_COUNT_START,
  FETCH_COUNT_FAILURE,
} from './types';
import { getPaging, getUsersCountData, getUsersSearchPayload } from './selectors';
import { get } from '../../utils/http';
import { ADMIN_USERS_COUNT_ENDPOINT, ADMIN_USERS_ENDPOINT } from '../../config';

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
export const fetchCountStart = createAction(FETCH_COUNT_START);
export const fetchCountFailure = createAction(FETCH_COUNT_FAILURE);

export const searchUsers = () => async (dispatch, getState) => {
  const { itemsPerPage, search } = getUsersSearchPayload(getState());
  const params = { page: 1, itemsPerPage };
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
  const params = { page: currentPage + 1, itemsPerPage };
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

export const getUsersCount = () => async (dispatch, getState) => {
  const { count } = getUsersCountData(getState());
  if (count !== 0) {
    return;
  }
  try {
    dispatch(fetchCountStart());
    const data = await get(ADMIN_USERS_COUNT_ENDPOINT);
    dispatch(setTotalUsers(data.count));
  } catch (e) {
    dispatch(fetchFailure());
  }
};
