import { createAction } from 'redux-actions';
import { SET_USER_DASHBOARD, SET_VALUES, SET_USER_REPORTS } from './types';
import { del, get, put } from '../../utils/http';
import { history } from '../../store/index';
import {
  USER_DASHBOARDS_ENDPOINT, USER_HOME_URL,
  USER_REPORTS_ENDPOINT
} from '../../config';
import { onRemoveDashboard } from '../dashboard/actions';

export const setUserDashboard = createAction(SET_USER_DASHBOARD, (data) => data);
export const setReports = createAction(SET_USER_REPORTS, (data) => data);

export const getUserDashboard = (id) => {
  return async (dispatch) => {
    try {
      const data = await get(`${USER_DASHBOARDS_ENDPOINT}/${id}`);
      dispatch(setUserDashboard(data));
      const reports = data.reports.map(async (report) => {
        return {
          ...(await get(`${USER_REPORTS_ENDPOINT}/${report.id}`))
        }
      });

      const reportsData = await Promise.all(reports);
      dispatch(setReports(reportsData));
    } catch (e) {
      console.log(e)
    }
  }
};

export const updateReport = (id, data) => {
  return async () => {
    try {

      const position_x = parseInt(data.left);
      const position_y = parseInt(data.top);


      const payload = position_x && position_y ? {position_x, position_y} : {};

      if (data.width) {
        payload.width = parseInt(data.width);
      }

      await put(`${USER_REPORTS_ENDPOINT}/${id}`, {
        data: payload
      })
    } catch (e) {

    }
  }
};

export const removeCurrentDashboar = (id) => {
  return async (dispatch) => {
    try {
      // await del(`${USER_DASHBOARDS_ENDPOINT}/${id + 2}`);
      dispatch(onRemoveDashboard(id));
      return history.push(USER_HOME_URL);
    } catch (e) {

    }
  }
};
