import { createAction } from 'redux-actions';
import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  OLD_PASSWORD_VALUE,
  PASSWORD_VALUE,
  PASSWORD_REPEAT_VALUE,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_EQUAL_ERROR,
  EMPTY_FIELDS_ERROR,
  ONCLOSE_ACTION,
} from './types';
import { get, put } from '../../utils/http';
import { USER_CHANGE_PASS_ENDPOINT, USER_DATA_ENDPOINT } from '../../config';
import { displayCustomPopup, closePopup } from '../popups/actions';
import PopupTypes from '../popups/popupTypes';
import { CREATE_FAILURE, CREATE_START, CREATE_SUCCESS } from '../createUser/types';

export const setUserData = createAction(SET_USER_DATA, (data) => data);
export const clearUserData = createAction(CLEAR_USER_DATA, (data) => data);

export const changeOldPasswordValue = createAction(OLD_PASSWORD_VALUE, (data) => data);
export const changePasswordValue = createAction(PASSWORD_VALUE, (data) => data);
export const changePasswordRepeatValue = createAction(PASSWORD_REPEAT_VALUE, (data) => data);

export const passwordLengthError = createAction(PASSWORD_LENGTH_ERROR, (value) => value);
export const passwordEqualError = createAction(PASSWORD_EQUAL_ERROR, (value) => value);
export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);
export const onCloseAction = createAction(ONCLOSE_ACTION);
export const createSuccess = createAction(CREATE_SUCCESS);
export const createFailure = createAction(CREATE_FAILURE);
export const createStart = createAction(CREATE_START);


export const showPopup = () => async (dispatch) => {
  dispatch(displayCustomPopup(PopupTypes.CHANGE_PASSWORD));
};
export const onClose = () => async (dispatch) => {
  dispatch(onCloseAction());
  dispatch(closePopup());
};
export const getUserData = () => async (dispatch) => {
  try {
    const user = await get(USER_DATA_ENDPOINT, {});
    dispatch(setUserData(user));
  } catch (e) {
    console.error(e);
  }
};
export const changePass = () => async (dispatch, getState) => {
  try {
    const {
      user: {
        oldPassword,
        passwordRepeat,
        password,
      }
    } = getState();
    if (!oldPassword || !passwordRepeat || !password) {
      return dispatch(emptyFieldsError());
    }
    if (password.length < 6) {
      return dispatch(passwordLengthError());
    }
    if (password !== passwordRepeat) {
      return dispatch(passwordEqualError());
    }
    dispatch(createStart());
    try {
      const data = await put(USER_CHANGE_PASS_ENDPOINT, {
        data: {
          old_password: oldPassword,
          password,
        }
      });
      dispatch(createSuccess(data));
      dispatch(onClose());
      dispatch(displayCustomPopup(PopupTypes.CHANGE_PASSWORD_SUCCESS));
    } catch (e) {
      console.log(e);
      dispatch(createFailure());
      dispatch(displayCustomPopup(PopupTypes.CHANGE_PASSWORD_FAILURE));
    }
  } catch (e) {
    console.error(e);
  }
};
