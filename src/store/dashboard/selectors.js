import { compose, prop } from 'lodash/fp';

const root = (state) => state.dashboard;
export const getDashboards = compose(prop('dashboards'), root);
export const getDashboardsCount = compose(prop('length'), getDashboards);
export const getDashboardsCountData = compose(
  (count) => ({ count, isLoading: false }),
  getDashboardsCount
);
export const getSearchInputText = compose(prop('search'), root);
export const getDashboardForDelete = compose(prop('dashboardForDelete'), root);
