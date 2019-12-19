import { createAction } from 'redux-actions';
import {CHANGE_SEARCH_INPUT, FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from './types';
import {getDashboards, getSearchInputText} from './selectors';
import { get } from '../../utils/http';
import { USER_DASHBOARDS_ENDPOINT} from '../../config';

export const fetchStart = createAction(FETCH_START);
export const fetchError = createAction(FETCH_ERROR);
export const onRemoveDashboard = createAction(FETCH_ERROR, (value) => value);
export const fetchSuccess = createAction(FETCH_SUCCESS, (value) => value);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (value) => value);

export const fetchDashboards = () => async (dispatch, getState) => {
  const dashboards = getDashboards(getState());
  if (dashboards.length) {
    return;
  }
  try {
    dispatch(fetchStart());
    const data = await get(USER_DASHBOARDS_ENDPOINT, {
      params: {
        page: 1,
        itemsPerPage: 20,
      },
    });
    dispatch(fetchSuccess(data));
  } catch (e) {
    dispatch(fetchError());
  }
};

export const searchDashboards = () => async (dispatch, getState) => {
  const search = getSearchInputText(getState());
  const params = { page: 1, itemsPerPage: 20 };
  if (search) params.search = search;
  dispatch(fetchStart());
  try {
    const data = await get(USER_DASHBOARDS_ENDPOINT, { params });
    dispatch(fetchSuccess(data));
  } catch (e) {
    dispatch(fetchError());
  }
};
