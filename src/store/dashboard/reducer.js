import {CHANGE_SEARCH_INPUT, FETCH_ERROR, FETCH_START, FETCH_SUCCESS, REMOVE_DASHBOARD} from './types';

const initialState = {
  dashboards: [],
  search: '',
  itemsPerPage: 20,
  isLoading: false,
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return { ...state, search: action.payload };
    case FETCH_START:
      return { ...state, isLoading: true };
    case FETCH_ERROR:
      return { ...state, isLoading: false };
    case FETCH_SUCCESS:
      return { ...state, dashboards: action.payload, isLoading: false };
    case REMOVE_DASHBOARD:
      return { ...state, dashboards: state.dashboards.filter((id) => id !== action.payload) };
    default:
      return state;
  }
}
