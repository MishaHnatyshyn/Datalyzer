import { createAction } from 'redux-actions';
import { CHANGE_SEARCH_INPUT } from './types';

export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT, (value) => value);
