import {
  CHANGE_NEW_DASHBOARD_NAME,
  CLEAR_STATE,
  DELETE_DIMENSION,
  DELETE_FACT,
  DESELECT_MODEL,
  FETCH_MODEL_FOR_REPORT_SUCCESS,
  FETCH_MODELS_FOR_REPORT_ERROR,
  SELECT_CHART_TYPE,
  SELECT_DIMENSION,
  SELECT_FACT,
  SELECT_MODEL,
  FETCH_REPORT_DATA_SUCCESS,
  FETCH_REPORT_DATA_ERROR,
  FETCH_REPORT_DATA_START,
  GO_TO_SECOND_STEP,
  RETURN_TO_FIRST_STEP,
  SELECT_DASHBOARD,
} from './types';
import { fetchModelForReportStart } from './actions';

const initialState = {
  step: 1,
  selectedModel: null,
  models: [],
  isLoading: false,
  selectedDimension: null,
  selectedFact: null,
  selectedChartType: 1,
  newDashboardName: '',
  reportData: [],
  reportDataLoading: false,
  selectedDashboard: null,
};

export default function createReportReducer(state = initialState, action) {
  switch (action.type) {
    case GO_TO_SECOND_STEP:
      return { ...state, step: 2 };
    case RETURN_TO_FIRST_STEP:
      return { ...state, step: 1 };
    case SELECT_MODEL:
      return { ...state, selectedModel: action.payload };
    case DESELECT_MODEL:
      return { ...state, selectedModel: null };
    case fetchModelForReportStart:
      return { ...state, isLoading: true };
    case FETCH_MODEL_FOR_REPORT_SUCCESS:
      return { ...state, models: action.payload, isLoading: false };
    case FETCH_MODELS_FOR_REPORT_ERROR:
      return { ...state, isLoading: false };
    case CLEAR_STATE:
      return initialState;
    case SELECT_CHART_TYPE:
      return { ...state, selectedChartType: action.payload };
    case SELECT_DIMENSION:
      return { ...state, selectedDimension: action.payload };
    case SELECT_FACT:
      return { ...state, selectedFact: action.payload };
    case DELETE_DIMENSION:
      return { ...state, selectedDimension: null };
    case DELETE_FACT:
      return { ...state, selectedFact: null };
    case CHANGE_NEW_DASHBOARD_NAME:
      return { ...state, newDashboardName: action.payload };
    case FETCH_REPORT_DATA_ERROR:
      return { ...state, reportDataLoading: false };
    case FETCH_REPORT_DATA_START:
      return { ...state, reportData: [], reportDataLoading: true };
    case FETCH_REPORT_DATA_SUCCESS:
      return { ...state, reportData: action.payload, reportDataLoading: false };
    case SELECT_DASHBOARD:
      return { ...state, selectedDashboard: action.payload };
    default:
      return state;
  }
}
