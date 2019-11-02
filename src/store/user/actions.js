import { createAction } from 'redux-actions';
import { SET_USER_DATA, CLEAR_USER_DATA } from './types';
import { getToken } from '../login/selectors';
import { get } from '../../utils/http';
import { USER_DATA_ENDPOINT } from '../../config';

export const setUserData = createAction(SET_USER_DATA, (data) => data);
export const clearUserData = createAction(CLEAR_USER_DATA, (data) => data);

export const getUserData = () => async (dispatch, getState) => {
  const token = getToken(getState());
  if (!token) return;
  const user = await get(USER_DATA_ENDPOINT, {}, token);
  dispatch(setUserData(user));
};
