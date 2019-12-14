import {
  DESELECT_MODEL, FETCH_MODEL_FOR_REPORT_SUCCESS, FETCH_MODELS_FOR_REPORT_ERROR, SELECT_MODEL
} from './types';
import { fetchModelForReportStart } from './actions';

const initialState = {
  selectedModel: null,
  models: [],
  isLoading: false
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
    default:
      return state;
  }
}
