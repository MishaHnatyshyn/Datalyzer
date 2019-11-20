import { createAction } from 'redux-actions';
import {
  FETCH_FAILURE,
  FETCH_START,
  SET_MODELS,
  APPEND_MODELS,
  NEXT_PAGE,
  SET_TOTAL_MODELS,
  CREATE_FAILURE,
  CREATE_START,
  CREATE_SUCCESS,
  CHANGE_SEARCH_INPUT
} from './types';
import { getPaging, getModelsSearchPayload } from './selectors';
import { get } from '../../utils/http';
import { ADMIN_MODELS_ENDPOINT, ADMIN_MODELS_COUNT_ENDPOINT } from '../../config';

export const fetchStart = createAction(FETCH_START);
export const fetchFailure = createAction(FETCH_FAILURE);
export const nextPage = createAction(NEXT_PAGE);
export const setTotalModels = createAction(SET_TOTAL_MODELS, (count) => count);
export const createModelFailure = createAction(CREATE_FAILURE);
export const createModelStart = createAction(CREATE_START);
export const createModelSuccess = createAction(CREATE_SUCCESS, (model) => model);
export const setModels = createAction(SET_MODELS, (models) => models);
export const appendModels = createAction(APPEND_MODELS, (models) => models);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (value) => value);

export const searchModels = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage, search } = getModelsSearchPayload(getState());
  const params = { currentPage, itemsPerPage };
  if (search) params.search = search;
  dispatch(fetchStart());
  try {
    const data = await get(ADMIN_MODELS_ENDPOINT, { params });
    dispatch(setModels(data));
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const fetchNextPage = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage, search } = getModelsSearchPayload(getState());
  const params = { currentPage: currentPage + 1, itemsPerPage };
  if (search) params.search = search;
  dispatch(fetchStart());
  try {
    const data = await get(ADMIN_MODELS_ENDPOINT, { params });
    dispatch(appendModels(data));
    dispatch(nextPage());
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const moveToNextPage = () => (dispatch, getState) => {
  const { lastLoadedPage, currentPage } = getPaging(getState());
  if (currentPage === lastLoadedPage) return dispatch(fetchNextPage());
  dispatch(nextPage());
};

export const getModelsCount = () => async (dispatch) => {
  try {
    const data = await get(ADMIN_MODELS_COUNT_ENDPOINT);
    dispatch(setTotalModels(data.count));
  } catch (e) {
    dispatch(fetchFailure());
  }
};