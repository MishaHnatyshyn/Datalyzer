import { createAction } from 'redux-actions';
import {
  CHANGE_NEW_DASHBOARD_NAME,
  CLEAR_STATE,
  DELETE_DIMENSION,
  DELETE_FACT,
  DESELECT_MODEL,
  FETCH_MODEL_FOR_REPORT_SUCCESS,
  FETCH_MODELS_FOR_REPORT_ERROR,
  FETCH_MODELS_FOR_REPORT_START, SELECT_CHART_TYPE, SELECT_DIMENSION, SELECT_FACT,
  SELECT_MODEL
} from './types';
import { getReportModels } from './selectors';
import { get } from '../../utils/http';
import { USER_REPORT_MODELS_ENDPOINT } from '../../config';

export const selectModel = createAction(SELECT_MODEL, (model) => model);
export const deselectModel = createAction(DESELECT_MODEL);
export const fetchModelForReportStart = createAction(FETCH_MODELS_FOR_REPORT_START);
export const fetchModelForReportError = createAction(FETCH_MODELS_FOR_REPORT_ERROR);
export const fetchModelForReportSuccess = createAction(FETCH_MODEL_FOR_REPORT_SUCCESS,
  (models) => models);
export const selectFact = createAction(SELECT_FACT, (fact) => fact);
export const deleteFact = createAction(DELETE_FACT);
export const selectDimension = createAction(SELECT_DIMENSION, (dimension) => dimension);
export const deleteDimension = createAction(DELETE_DIMENSION);
export const selectChartType = createAction(SELECT_CHART_TYPE, (type) => type);
export const changeNewDashboardName = createAction(CHANGE_NEW_DASHBOARD_NAME, (value) => value);
export const clearState = createAction(CLEAR_STATE);

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
