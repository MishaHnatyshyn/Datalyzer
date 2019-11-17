import { createAction } from 'redux-actions';
import {
  FETCH_FAILURE,
  FETCH_START,
  SET_CONNECTIONS,
  APPEND_CONNECTIONS,
  NEXT_PAGE,
  SET_TOTAL_CONNECTIONS,
  CREATE_FAILURE,
  CREATE_START,
  CREATE_SUCCESS,
  CHANGE_SEARCH_INPUT,
  HOST_VALUE,
  PORT_VALUE,
  NAME_DB_VALUE,
  USERNAME_VALUE,
  PASSWORD_VALUE,
  TYPE_VALUE,
} from './types';
import { getPaging, getConnectionsSearchPayload } from './selectors';
import { get } from '../../utils/http';
import { ADMIN_CONNECTIONS_ENDPOINT, ADMIN_CONNECTIONS_COUNT_ENDPOINT } from '../../config';

export const fetchStart = createAction(FETCH_START);
export const fetchFailure = createAction(FETCH_FAILURE);
export const nextPage = createAction(NEXT_PAGE);
export const setTotalConnections = createAction(SET_TOTAL_CONNECTIONS, (count) => count);
export const createConnectionFailure = createAction(CREATE_FAILURE);
export const createConnectionStart = createAction(CREATE_START);
export const createConnectionSuccess = createAction(CREATE_SUCCESS, (connection) => connection);
export const setConnections = createAction(SET_CONNECTIONS, (connections) => connections);
export const appendConnections = createAction(APPEND_CONNECTIONS, (connections) => connections);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (value) => value);


export const getHostValue = createAction(HOST_VALUE, (connection) => connection);
export const getPortValue = createAction(PORT_VALUE, (connection) => connection);
export const getNameDBValue = createAction(NAME_DB_VALUE, (connection) => connection);
export const getUsernameValue = createAction(USERNAME_VALUE, (connection) => connection);
export const getPasswordValue = createAction(PASSWORD_VALUE, (connection) => connection);
export const getTypeValue = createAction(TYPE_VALUE, (connection) => connection.value);

export const searchConnections = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage, search } = getConnectionsSearchPayload(getState());
  const params = { currentPage, itemsPerPage };
  if (search) params.search = search;
  dispatch(fetchStart());
  try {
    const data = await get(ADMIN_CONNECTIONS_ENDPOINT, { params });
    dispatch(setConnections(data));
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const fetchNextPage = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage, search } = getConnectionsSearchPayload(getState());
  const params = { currentPage: currentPage + 1, itemsPerPage };
  if (search) params.search = search;
  dispatch(fetchStart());
  try {
    const data = await get(ADMIN_CONNECTIONS_ENDPOINT, { params });
    dispatch(appendConnections(data));
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

export const getModelsCount = () => async (dispatch) => {
  try {
    const data = await get(ADMIN_CONNECTIONS_COUNT_ENDPOINT);
    dispatch(setTotalConnections(data.count));
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const newConnectionAction = () => async (dispatch, getState) => {
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
