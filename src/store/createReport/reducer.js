import {
  CLEAR_STATE,
  DELETE_DIMENSION,
  DELETE_FACT,
  DESELECT_MODEL,
  FETCH_MODEL_FOR_REPORT_SUCCESS,
  FETCH_MODELS_FOR_REPORT_ERROR,
  SELECT_CHART_TYPE,
  SELECT_DIMENSION,
  SELECT_FACT,
  SELECT_MODEL
} from './types';
import { fetchModelForReportStart } from './actions';

const initialState = {
  selectedModel: null,
  models: [],
  isLoading: false,
  selectedDimension: null,
  selectedFact: null,
  selectedChartType: 1,
};

export default function createReportReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
