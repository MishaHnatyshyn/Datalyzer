import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import {
  CHANGE_FORM_FIELD,
  FETCH_FAILURE,
  FETCH_START,
  FETCH_END,
  SET_USERS,
  APPEND_USERS,
  NEXT_PAGE,
  PREV_PAGE,
  SET_TOTAL_USERS,
  CREATE_FAILURE,
  CREATE_START,
  CREATE_SUCCESS,
  CHANGE_SEARCH_INPUT,
  FORM_USER_TYPE_INPUT_VALUE,
  FORM_DESCRIPTION_INPUT_VALUE,
  FORM_USERNAME_INPUT_VALUE,
  FORM_PASSWORD_INPUT_VALUE,
  FORM_PASSWORD_REPEAT_INPUT_VALUE,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_EQUAL_ERROR,
  EMPTY_FIELDS_ERROR,
  CLOSE_ACTION,
  FETCH_COUNT_START,
  FETCH_COUNT_FAILURE,
  DELETE_USER,
  DELETE_USER_START,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
} from './types';
import {
  getItemsPerPage, getPaging, getUserForDeleting, getUsersCountData, getUsersSearchPayload
} from './selectors';
import { del, get, post } from '../../utils/http';
import { ADMIN_USERS_COUNT_ENDPOINT, ADMIN_USERS_ENDPOINT } from '../../config';
import { createUserDeleteRoute } from '../../utils/routeCreators';
import { displayCustomPopup } from '../popups/actions';
import PopupTypes from '../popups/popupTypes';

export const changeInputField = createAction(
  CHANGE_FORM_FIELD,
  (field, value) => ({ field, value })
);
export const fetchStart = createAction(FETCH_START);
export const fetchFailure = createAction(FETCH_FAILURE);
export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);
export const fetchEnd = createAction(FETCH_END);
export const nextPage = createAction(NEXT_PAGE);
export const prevPage = createAction(PREV_PAGE);
export const setTotalUsers = createAction(SET_TOTAL_USERS, (count) => count);
export const createUserFailure = createAction(CREATE_FAILURE);
export const createUserStart = createAction(CREATE_START);
export const createUserSuccess = createAction(CREATE_SUCCESS, (user) => user);
export const setUsers = createAction(SET_USERS, (users) => users);
export const appendUsers = createAction(APPEND_USERS, (users) => users);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (value) => value);
export const setUserForDeleting = createAction(DELETE_USER, (value) => value);
export const passwordLengthError = createAction(PASSWORD_LENGTH_ERROR, (value) => value);
export const passwordEqualError = createAction(PASSWORD_EQUAL_ERROR, (value) => value);
export const getUserTypeValue = createAction(FORM_USER_TYPE_INPUT_VALUE, (object) => object.target.value);
export const getUsernameValue = createAction(FORM_USERNAME_INPUT_VALUE, (value) => value);
export const getPasswordValue = createAction(FORM_PASSWORD_INPUT_VALUE, (value) => value);
export const getUserDescriptionValue = createAction(FORM_DESCRIPTION_INPUT_VALUE, (value) => value);
export const getPasswordRepeatValue = createAction(FORM_PASSWORD_REPEAT_INPUT_VALUE, (value) => value);
export const onCloseAction = createAction(CLOSE_ACTION);
export const fetchCountStart = createAction(FETCH_COUNT_START);
export const fetchCountFailure = createAction(FETCH_COUNT_FAILURE);
export const deleteUserStart = createAction(DELETE_USER_START);
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS);
export const deleteUserError = createAction(DELETE_USER_ERROR);

export const getUsersCount = () => async (dispatch, getState) => {
  const state = getState();
  const { search } = getUsersSearchPayload(state);
  const params = {};
  if (search) {
    params.search = search;
  }

  try {
    dispatch(fetchCountStart());
    const data = await get(ADMIN_USERS_COUNT_ENDPOINT, { params });
    dispatch(setTotalUsers(data.count));
  } catch (e) {
    dispatch(fetchFailure());
  }
};

export const searchUsers = () => async (dispatch, getState) => {
  const { itemsPerPage, search } = getUsersSearchPayload(getState());
  const params = { page: 1, itemsPerPage };
  if (search) params.search = search;
  try {
    await dispatch(getUsersCount());
    dispatch(fetchStart());
    const data = await get(ADMIN_USERS_ENDPOINT, { params });
    dispatch(setUsers(data));
  } catch (e) {
    dispatch(fetchFailure());
  }
};


export const fetchNextPage = () => async (dispatch, getState) => {
  const { currentPage, itemsPerPage, search } = getUsersSearchPayload(getState());
  const nextPageNumber = currentPage + 1;
  const params = { page: nextPageNumber, itemsPerPage };
  if (search) params.search = search;
  dispatch(fetchStart());
  try {
    const data = await get(ADMIN_USERS_ENDPOINT, { params });
    dispatch(fetchEnd(nextPage));
    dispatch(appendUsers(data));
    dispatch(nextPage());
  } catch (e) {
    dispatch(fetchFailure());
  }
};


export const moveToNextPage = () => (dispatch, getState) => {
  const state = getState();
  const { lastLoadedPage, currentPage } = getPaging(state);
  const itemsPerPage = getItemsPerPage(state);
  const { count } = getUsersCountData(state);
  if (currentPage === lastLoadedPage) return dispatch(fetchNextPage());
  if (currentPage * itemsPerPage < count) {
    dispatch(nextPage());
  }
};

export const moveToPrevPage = () => (dispatch, getState) => {
  const { currentPage } = getPaging(getState());
  if (currentPage === 1) {
    return;
  }
  dispatch(prevPage());
};

export const deleteUser = () => async (dispatch, getState) => {
  const userId = getUserForDeleting(getState());
  try {
    dispatch(deleteUserStart());
    await del(createUserDeleteRoute(userId));
    dispatch(deleteUserSuccess());
    dispatch(displayCustomPopup(PopupTypes.DELETE_USER_SUCCESS));
  } catch (e) {
    dispatch(deleteUserError());
    dispatch(displayCustomPopup(PopupTypes.DELETE_USER_ERROR));
  }
};

export const newUser = () => async (dispatch, getState) => {
  const {
    adminUsers: {
      formUserType,
      formDescription,
      formPasswordRepeat,
      formUsername,
      formPassword,
    }
  } = getState();
  if (!formUsername || !formPassword || !formUserType || !formPasswordRepeat) {
    return dispatch(emptyFieldsError());
  }
  if (formPassword.length < 6) {
    return dispatch(passwordLengthError());
  }
  if (formPassword !== formPasswordRepeat) {
    return dispatch(passwordEqualError());
  }
  dispatch(createUserStart());
  try {
    const data = await post(ADMIN_USERS_ENDPOINT, {
      data: {
        username: formUsername,
        password: formPassword,
        user_type_id: Number(formUserType),
        description: formDescription,
      }
    });
    dispatch(createUserSuccess(data));
    dispatch(push('/admin/users'));
  } catch (e) {
    dispatch(createUserFailure());
  }
};
