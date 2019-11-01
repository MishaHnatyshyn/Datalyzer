import { createAction } from 'redux-actions';
import { SET_USER_DATA, CLEAR_USER_DATA } from './types';

export const setUserData = createAction(SET_USER_DATA, (data) => data);
export const clearUserData = createAction(CLEAR_USER_DATA, (data) => data);
