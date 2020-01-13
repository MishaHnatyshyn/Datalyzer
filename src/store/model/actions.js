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
  CHANGE_SEARCH_INPUT,
  FETCH_COUNT_START,
  FETCH_COUNT_FAILURE,
  DELETE_MODEL_START,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_ERROR,
  DELETE_MODEL,
  EMPTY_FIELDS_ERROR,
  CHANGE_NAME,
  CHANGE_NAME_START,
  CHANGE_NAME_SUCCESS,
  CHANGE_NAME_FAILURE,
  ONCLOSE_ACTION,
  RENAME_MODEL,
} from './types';
import {
  getPaging,
  getModelsSearchPayload,
  getModelsCountData,
  getModelForDeleting,
  getModelForRenaming,
  getName
} from './selectors';
import { del, get, put } from '../../utils/http';
import {
  ADMIN_MODELS_ENDPOINT,
  ADMIN_MODELS_COUNT_ENDPOINT,
} from '../../config';
import { createModelDeleteRoute, createModelRenameRoute } from '../../utils/routeCreators';
import { displayCustomPopup, closePopup } from '../popups/actions';
import PopupTypes from '../popups/popupTypes';

export const fetchStart = createAction(FETCH_START);
export const fetchCountStart = createAction(FETCH_COUNT_START);
export const fetchCountFailure = createAction(FETCH_COUNT_FAILURE);
export const setTotalModels = createAction(SET_TOTAL_MODELS, (count) => count);
export const fetchFailure = createAction(FETCH_FAILURE);
export const nextPage = createAction(NEXT_PAGE);
export const createModelFailure = createAction(CREATE_FAILURE);
export const createModelStart = createAction(CREATE_START);
export const createModelSuccess = createAction(CREATE_SUCCESS, (model) => model);
export const setModels = createAction(SET_MODELS, (models) => models);
export const appendModels = createAction(APPEND_MODELS, (models) => models);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (value) => value);
export const setModelForDeleting = createAction(DELETE_MODEL, (value) => value);
export const deleteModelStart = createAction(DELETE_MODEL_START);
export const deleteModelSuccess = createAction(DELETE_MODEL_SUCCESS);
export const deleteModelError = createAction(DELETE_MODEL_ERROR);

export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);
export const changeNameValue = createAction(CHANGE_NAME, (value) => value);
export const onCloseAction = createAction(ONCLOSE_ACTION);
export const changeNameSuccess = createAction(CHANGE_NAME_SUCCESS);
export const changeNameFailure = createAction(CHANGE_NAME_FAILURE);
export const changeNameStart = createAction(CHANGE_NAME_START);
export const setModelForRenaming = createAction(RENAME_MODEL, (value) => value);

export const onClose = () => async (dispatch) => {
  dispatch(closePopup());
  dispatch(onCloseAction());
};
export const searchModels = () => async (dispatch, getState) => {
  const { itemsPerPage, search } = getModelsSearchPayload(getState());
  const params = { page: 1, itemsPerPage };
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
  const params = { page: currentPage + 1, itemsPerPage };
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

export const getModelsCount = () => async (dispatch, getState) => {
  const { count } = getModelsCountData(getState());
  if (count !== 0) {
    return;
  }
  try {
    dispatch(fetchCountStart());
    const data = await get(ADMIN_MODELS_COUNT_ENDPOINT);
    dispatch(setTotalModels(data.count));
  } catch (e) {
    dispatch(fetchCountFailure());
  }
};

export const deleteModel = () => async (dispatch, getState) => {
  const modelId = getModelForDeleting(getState());
  try {
    dispatch(deleteModelStart());
    await del(createModelDeleteRoute(modelId));
    dispatch(deleteModelSuccess());
    dispatch(displayCustomPopup(PopupTypes.DELETE_MODEL_SUCCESS));
  } catch (e) {
    dispatch(deleteModelError());
    dispatch(displayCustomPopup(PopupTypes.DELETE_MODEL_ERROR));
  }
};

export const renameModel = () => async (dispatch, getState) => {
  const name = getName(getState());
  const modelId = getModelForRenaming(getState());
  if (!name) {
    return dispatch(emptyFieldsError());
  }
  dispatch(changeNameStart());
  try {
    const data = await put(createModelRenameRoute(modelId), {
      data: {
        name,
      }
    });
    dispatch(changeNameSuccess(data));
    dispatch(onClose());
    dispatch(displayCustomPopup(PopupTypes.RENAME_MODEL_SUCCESS));
  } catch (e) {
    console.log(e);
    dispatch(changeNameFailure());
    dispatch(displayCustomPopup(PopupTypes.RENAME_MODEL_FAILURE));
  }
};
