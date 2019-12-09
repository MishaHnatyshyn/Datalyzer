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
  FETCH_COUNT_START,
  FETCH_COUNT_FAILURE,
  DELETE_CONNECTION,
  DELETE_CONNECTION_START,
  DELETE_CONNECTION_SUCCESS,
  DELETE_CONNECTION_ERROR,
} from './types';
import {
  getPaging,
  getConnectionsSearchPayload,
  getConnectionsCountData,
  getConnectionForDeleting,
} from './selectors';
import { del, get } from '../../utils/http';
import { ADMIN_CONNECTIONS_ENDPOINT, ADMIN_CONNECTIONS_COUNT_ENDPOINT } from '../../config';
import { createConnectionDeleteRoute } from '../../utils/routeCreators';
import { displayCustomPopup } from '../popups/actions';
import PopupTypes from '../popups/popupTypes';

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
export const setConnectionForDeleting = createAction(DELETE_CONNECTION, (value) => value);
export const fetchCountStart = createAction(FETCH_COUNT_START);
export const fetchCountFailure = createAction(FETCH_COUNT_FAILURE);
export const deleteConnectionStart = createAction(DELETE_CONNECTION_START);
export const deleteConnectionSuccess = createAction(DELETE_CONNECTION_SUCCESS);
export const deleteConnectionError = createAction(DELETE_CONNECTION_ERROR);

export const searchConnections = () => async (dispatch, getState) => {
  const { itemsPerPage, search } = getConnectionsSearchPayload(getState());
  const params = { page: 1, itemsPerPage };
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
  const params = { page: currentPage + 1, itemsPerPage };
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

export const getConnectionsCount = () => async (dispatch, getState) => {
  const { count } = getConnectionsCountData(getState());
  if (count !== 0) {
    return;
  }
  try {
    dispatch(fetchCountStart());
    const data = await get(ADMIN_CONNECTIONS_COUNT_ENDPOINT);
    dispatch(setTotalConnections(data.count));
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const deleteConnection = () => async (dispatch, getState) => {
  const connectionId = getConnectionForDeleting(getState());
  try {
    dispatch(deleteConnectionStart());
    await del(createConnectionDeleteRoute(connectionId));
    dispatch(deleteConnectionSuccess());
    dispatch(displayCustomPopup(PopupTypes.DELETE_CONNECTION_SUCCESS));
  } catch (e) {
    dispatch(deleteConnectionError());
    dispatch(displayCustomPopup(PopupTypes.DELETE_CONNECTION_ERROR));
  }
};
