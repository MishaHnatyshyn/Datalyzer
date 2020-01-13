import {
  CHANGE_SEARCH_INPUT, FETCH_ERROR, FETCH_START, FETCH_SUCCESS
} from './types';

const initialState = {
  models: [],
  search: '',
  itemsPerPage: 20,
  isLoading: false,
};

export default function userModelReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return { ...state, search: action.payload };
    case FETCH_START:
      return { ...state, isLoading: true };
    case FETCH_ERROR:
      return { ...state, isLoading: false };
    case FETCH_SUCCESS:
      return { ...state, dashboards: action.payload, isLoading: false };
    default:
      return state;
  }
}
