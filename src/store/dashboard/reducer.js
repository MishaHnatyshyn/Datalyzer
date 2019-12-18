import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from './types';

const initialState = {
  dashboards: [],
  isLoading: false,
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
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
