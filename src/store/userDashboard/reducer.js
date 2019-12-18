import { SET_VALUES } from './types';

const initialState = {
  values: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUES:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.id]: action.payload.data
        }
      };
    default:
      return state;
  }
}
