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
  NAME_CONNECTION_VALUE,
} from './types';
import { EMPTY_FIELDS_ERROR } from '../login/types';
import { getPaging, getConnectionsSearchPayload } from './selectors';
import { get, post } from '../../utils/http';
import {
  ADMIN_CONNECTIONS_ENDPOINT,
  ADMIN_CONNECTIONS_COUNT_ENDPOINT,
  ADMIN_CONNECTIONS_CREATE_ENDPOINT
} from '../../config';

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
export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);


export const getHostValue = createAction(HOST_VALUE, (connection) => connection);
export const getPortValue = createAction(PORT_VALUE, (connection) => connection);
export const getNameDBValue = createAction(NAME_DB_VALUE, (connection) => connection);
export const getNameConnectionValue = createAction(NAME_CONNECTION_VALUE, (connection) => connection);
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
  const {
    connections: {
      host,
      port,
      nameDB,
      username: name,
      password,
      type,
      nameConnection,
    }
  } = getState();

  if (!name || !password || !host || !port || !nameDB || !type || !nameConnection) {
    return dispatch(emptyFieldsError());
  }
  dispatch(createConnectionStart());
  try {
    const data = await post(ADMIN_CONNECTIONS_CREATE_ENDPOINT, {
      host,
      port,
      name: nameConnection,
      databaseName: nameDB,
      username: name,
      password,
      typeId: type,
    });
    dispatch(setConnections(data));
  } catch (e) {
    dispatch(createConnectionFailure());
  }
};
