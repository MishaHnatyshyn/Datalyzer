import {
  APPEND_MODELS,
  SET_MODELS,
  SET_TOTAL_MODELS,
  CHANGE_SEARCH_INPUT,
  CREATE_FAILURE,
  CREATE_START,
  FETCH_FAILURE,
  FETCH_START,
  NEXT_PAGE,
} from './types';

const initialState = {
  models: [],
  totalModels: {
    count: 0,
    isLoading: true
  },
  currentPage: 1,
  search: '',
  itemsPerPage: 6,
  lastLoadedPage: 1,
  error: false,
  isLoading: false,
  hasNextPage: true,
};

export default function modelReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case SET_MODELS:
      return {
        ...state,
        models: action.payload,
        error: false,
        isLoading: false
      };
    case APPEND_MODELS:
      return {
        ...state,
        models: [...state.models, ...action.payload],
        hasNextPage: action.payload.length > 0,
        error: false,
        isLoading: false
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    case CREATE_START:
      return {
        ...state,
        isCreatingInProgress: true
      };
    case SET_TOTAL_MODELS:
      return {
        ...state,
        totalModels: {
          count: action.payload,
          isLoading: false,
        }
      };
    case CREATE_FAILURE:
      return {
        ...state,
        isCreatingInProgress: false,
        error: true,
      };
    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
}
