import { compose, prop } from 'lodash/fp';

const root = (state) => state.userDashboard;

export const getDashboard = compose(prop('dashboard'), root);
export const getDashboardName = compose(prop('dashboard.name'), root);
export const getReports = compose(prop('reports'), root);
