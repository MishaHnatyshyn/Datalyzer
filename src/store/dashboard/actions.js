import { createAction } from 'redux-actions';
import {
  CHANGE_SEARCH_INPUT, DELETE_DASHBOARD_SUCCESS,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  NEW_DASHBOARD,
  SET_DASHBOARD_FOR_DELETE
} from './types';
import { getDashboardForDelete, getDashboards, getSearchInputText } from './selectors';
import { del, get } from '../../utils/http';
import { USER_DASHBOARDS_ENDPOINT } from '../../config';
import { createDashboardDeleteRoute } from '../../utils/routeCreators';
import { displayCustomPopup } from '../popups/actions';
import PopupTypes from '../popups/popupTypes';

export const fetchStart = createAction(FETCH_START);
export const fetchError = createAction(FETCH_ERROR);
export const fetchSuccess = createAction(FETCH_SUCCESS, (value) => value);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (value) => value);
export const addNewDashboard = createAction(NEW_DASHBOARD, (dashboard) => dashboard);
export const setDashboardForDelete = createAction(SET_DASHBOARD_FOR_DELETE,
  (dashboard) => dashboard);
export const deleteDashboardSuccess = createAction(DELETE_DASHBOARD_SUCCESS);

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

export const deleteDashboard = () => async (dispatch, getState) => {
  const dashboardForDelete = getDashboardForDelete(getState());
  if (!dashboardForDelete) {
    return;
  }
  try {
    await del(createDashboardDeleteRoute(dashboardForDelete));
    dispatch(deleteDashboardSuccess());
    dispatch(displayCustomPopup(PopupTypes.DELETE_SUCCESS));
  } catch (e) {
    console.error(e);
  }
};
