import { createAction } from 'redux-actions';
import {
  DESELECT_MODEL,
  FETCH_MODEL_FOR_REPORT_SUCCESS,
  FETCH_MODELS_FOR_REPORT_ERROR,
  FETCH_MODELS_FOR_REPORT_START,
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
