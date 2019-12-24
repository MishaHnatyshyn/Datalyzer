import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import {
  CHANGE_NEW_DASHBOARD_NAME,
  CLEAR_STATE,
  DELETE_DIMENSION,
  DELETE_FACT,
  DESELECT_MODEL,
  FETCH_MODEL_FOR_REPORT_SUCCESS,
  FETCH_MODELS_FOR_REPORT_ERROR,
  FETCH_MODELS_FOR_REPORT_START,
  FETCH_REPORT_DATA_ERROR,
  FETCH_REPORT_DATA_START,
  FETCH_REPORT_DATA_SUCCESS,
  GO_TO_SECOND_STEP,
  RETURN_TO_FIRST_STEP,
  SELECT_CHART_TYPE,
  SELECT_DASHBOARD,
  SELECT_DIMENSION,
  SELECT_FACT,
  SELECT_MODEL,
} from './types';
import {
  getChartType,
  getNewDashboardName,
  getReportModels,
  getSelectedDashboard,
  getSelectedDimension,
  getSelectedFact,
} from './selectors';
import { get, post } from '../../utils/http';
import { USER_REPORT_MODELS_ENDPOINT, USER_REPORTS_ENDPOINT } from '../../config';

export const selectModel = createAction(SELECT_MODEL, (model) => model);
export const selectDashboard = createAction(SELECT_DASHBOARD, (dashboard) => dashboard);
export const deselectModel = createAction(DESELECT_MODEL);
export const fetchModelForReportStart = createAction(FETCH_MODELS_FOR_REPORT_START);
export const fetchModelForReportError = createAction(FETCH_MODELS_FOR_REPORT_ERROR);
export const fetchModelForReportSuccess = createAction(
  FETCH_MODEL_FOR_REPORT_SUCCESS,
  (models) => models,
);
export const fetchDataForReportStart = createAction(FETCH_REPORT_DATA_START);
export const fetchDataForReportError = createAction(FETCH_REPORT_DATA_ERROR);
export const fetchDataForReportSuccess = createAction(FETCH_REPORT_DATA_SUCCESS, (data) => data);
export const selectFact = createAction(SELECT_FACT, (fact) => fact);
export const deleteFact = createAction(DELETE_FACT);
export const selectDimension = createAction(SELECT_DIMENSION, (dimension) => dimension);
export const deleteDimension = createAction(DELETE_DIMENSION);
export const selectChartType = createAction(SELECT_CHART_TYPE, (type) => type);
export const changeNewDashboardName = createAction(CHANGE_NEW_DASHBOARD_NAME, (value) => value);
export const clearState = createAction(CLEAR_STATE);
export const goToTheSecondStep = createAction(GO_TO_SECOND_STEP);
export const returnToTheFirstStep = createAction(RETURN_TO_FIRST_STEP);

// export const selectModelById = () => (dispatch, getState) => {
//  const selectedModel = getSelectedModelById(getState);
// };

export const fetchModelsForReport = () => async (dispatch, getState) => {
  const currentModels = getReportModels(getState());
  if (currentModels.length) {
    return;
  }

  try {
    dispatch(fetchModelForReportStart());
    const data = await get(USER_REPORT_MODELS_ENDPOINT);
    dispatch(fetchModelForReportSuccess(data));
  } catch (e) {
    dispatch(fetchModelForReportError());
  }
};

export const fetchReportFieldValues = () => async (dispatch, getState) => {
  const fact = getSelectedFact(getState());
  const dimension = getSelectedDimension(getState());
  if (!fact || !dimension) {
    return;
  }
  try {
    dispatch(fetchDataForReportStart());
    const data = await get(`/reports/data?modelItemFieldId=${fact}&modelItemFieldId=${dimension}`);
    dispatch(fetchDataForReportSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(fetchDataForReportError(e));
  }
};

export const createReport = () => async (dispatch, getState) => {
  const fact = getSelectedFact(getState());
  const dimension = getSelectedDimension(getState());
  const dashboard = getSelectedDashboard(getState());
  const newDashboardName = getNewDashboardName(getState());
  const type = getChartType(getState());
  const modelItems = [fact, dimension];
  const data = {
    name: 'Report',
    type,
    modelItems,
  };
  if (!dashboard && newDashboardName) {
    data.dashboard = 0;
    data.newDashboardName = newDashboardName;
  } else {
    data.dashboard = dashboard;
  }
  try {
    const report = await post(USER_REPORTS_ENDPOINT, { data });
    const dashboardId = dashboard || report.dashboard_id;
    dispatch(push(`/user/dashboard/${dashboardId}`));
    dispatch(clearState());
  } catch (e) {
    console.error(e);
  }
};
