import {
  CHANGE_SEARCH_INPUT,
  DELETE_DASHBOARD_SUCCESS,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  NEW_DASHBOARD,
  SET_DASHBOARD_FOR_DELETE,
} from './types';

const initialState = {
  dashboards: [],
  search: '',
  itemsPerPage: 20,
  isLoading: false,
  dashboardForDelete: null,
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return { ...state, search: action.payload };
    case NEW_DASHBOARD:
      return { ...state, dashboards: [action.payload, ...state.dashboards] };
    case DELETE_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboards: state.dashboards.filter((_) => _.id !== parseInt(state.dashboardForDelete, 10)),
        dashboardForDelete: null,
      };
    case SET_DASHBOARD_FOR_DELETE:
      return { ...state, dashboardForDelete: action.payload };
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
