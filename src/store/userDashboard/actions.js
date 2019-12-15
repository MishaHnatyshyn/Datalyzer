import { createAction } from 'redux-actions';
import { SET_VALUES } from './types';
import { get } from '../../utils/http';
import { MODEL_FIELD_VALUES_ENDPOIND, USER_DATA_ENDPOINT } from '../../config';

export const setUserData = createAction(SET_VALUES, (data) => data);

export const getModelItemFieldItems = (id) => {
  return async (dispatch) => {
    try {
      const params = {connectionId: 14, modelItemFieldId: 62};
      const data = await get(MODEL_FIELD_VALUES_ENDPOIND, { params });
      dispatch(setUserData({ id: 62, data }))
    } catch (e) {

    }
  }
};
