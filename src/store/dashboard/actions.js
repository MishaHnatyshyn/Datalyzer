import { createAction } from 'redux-actions';
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from './types';
import { getDashboards } from './selectors';
import { get } from '../../utils/http';
import { USER_DASHBOARDS_ENDPOINT } from '../../config';

export const fetchStart = createAction(FETCH_START);
export const fetchError = createAction(FETCH_ERROR);
export const fetchSuccess = createAction(FETCH_SUCCESS, (value) => value);

export const fetchDashboards = () => async (dispatch, getState) => {
  const dashboards = getDashboards(getState());
  console.log('dashboards', dashboards);
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
