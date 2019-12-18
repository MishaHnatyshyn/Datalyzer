import { SET_USER_DASHBOARD, SET_USER_REPORTS, SET_VALUES } from './types';

const initialState = {
  dashboard: {},
  reports: [],
};

export default function userDashboard(state = initialState, { type, payload }) {
  switch (type) {
    case SET_VALUES:
      return {
        ...state,
        values: {
          ...state.values,
          [payload.id]: payload.data
        }
      };
    case SET_USER_DASHBOARD:
      return {
        ...state,
        dashboard: payload
      };
    case SET_USER_REPORTS:
      return {
        ...state,
        reports: payload
      };
    default:
      return state;
  }
}
