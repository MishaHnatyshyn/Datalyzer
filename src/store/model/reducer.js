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
  FETCH_COUNT_START,
  FETCH_COUNT_FAILURE,
  DELETE_MODEL,
  DELETE_MODEL_SUCCESS,
  EMPTY_FIELDS_ERROR,
  CHANGE_NAME,
  CHANGE_NAME_START,
  CHANGE_NAME_SUCCESS,
  CHANGE_NAME_FAILURE,
  ONCLOSE_ACTION,
  RENAME_MODEL,
} from './types';
import { EMPTY_FIELDS_ERROR_MESSAGE } from '../login/constants';

const initialState = {
  models: [],
  totalModels: {
    count: 0,
    isLoading: true,
  },
  currentPage: 1,
  search: '',
  name: '',
  itemsPerPage: 20,
  lastLoadedPage: 1,
  error: false,
  isLoading: false,
  hasNextPage: true,
  modelForDeleting: null,
  modelForRenaming: null,
};

export default function modelReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNT_START:
      return {
        ...state,
        totalModels: {
          isLoading: true,
        },
      };
    case FETCH_COUNT_FAILURE:
      return {
        ...state,
        totalModels: {
          count: 0,
          isLoading: false,
        },
      };
    case SET_TOTAL_MODELS:
      return {
        ...state,
        totalModels: {
          count: action.payload,
          isLoading: false,
        },
      };
    case FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case SET_MODELS:
      return {
        ...state,
        models: action.payload,
        error: false,
        isLoading: false,
      };
    case APPEND_MODELS:
      return {
        ...state,
        models: [...state.models, ...action.payload],
        hasNextPage: action.payload.length > 0,
        error: false,
        isLoading: false,
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case CREATE_START:
      return {
        ...state,
        isCreatingInProgress: true,
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
    case DELETE_MODEL:
      return {
        ...state,
        modelForDeleting: action.payload,
      };
    case DELETE_MODEL_SUCCESS:
      return {
        ...state,
        totalModels: {
          count: state.totalModels.count - 1,
          isLoading: false
        },
        models: state.models.filter(
          (model) => model.id !== state.modelForDeleting,
        ),
        modelForDeleting: null,
      };
    case EMPTY_FIELDS_ERROR:
      return {
        ...state,
        error: true,
        isLoading: false,
        errorMessage: EMPTY_FIELDS_ERROR_MESSAGE,
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case CHANGE_NAME_START:
      return {
        ...state,
        isLoading: true,
      };
    case CHANGE_NAME_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false,
        models: state.models.map(
          (model) => {
            if (model.id === state.modelForRenaming) {
              model.name = state.name;
            }
            return model;
          }
        ),
        name: '',
        modelForRenaming: null,
      };
    case CHANGE_NAME_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case ONCLOSE_ACTION:
      return {
        ...state,
        error: false,
        isLoading: false,
        name: '',
        modelForRenaming: null,
      };
    case RENAME_MODEL:
      return {
        ...state,
        modelForRenaming: action.payload,
      };
    default:
      return state;
  }
}
