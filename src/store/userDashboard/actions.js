import { createAction } from 'redux-actions';
import { SET_USER_DASHBOARD, SET_USER_REPORTS } from './types';
import { get, put } from '../../utils/http';
import {
  USER_DASHBOARDS_ENDPOINT,
  USER_REPORTS_ENDPOINT
} from '../../config';

export const setUserDashboard = createAction(SET_USER_DASHBOARD, (data) => data);
export const setReports = createAction(SET_USER_REPORTS, (data) => data);

export const getUserDashboard = (id) => async (dispatch) => {
  try {
    const data = await get(`${USER_DASHBOARDS_ENDPOINT}/${id}`);
    dispatch(setUserDashboard(data));
    const reports = data.reports.map(async (report) => ({
      ...(await get(`${USER_REPORTS_ENDPOINT}/${report.id}`))
    }));

    try {
      const reportsData = await Promise.all(reports);
      dispatch(setReports(reportsData));
    } catch (e) {
      dispatch(setReports([]));
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateReport = (id, data) => async () => {
  try {
    const position_x = parseInt(data.left, 10);
    const position_y = parseInt(data.top, 10);


    const payload = position_x && position_y ? { position_x, position_y } : {};

    if (data.width) {
      payload.width = parseInt(data.width, 10);
    }

    await put(`${USER_REPORTS_ENDPOINT}/${id}`, {
      data: payload
    });
  } catch (e) {
    console.error(e);
  }
};
