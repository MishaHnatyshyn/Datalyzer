import { compose, prop } from 'lodash/fp';

const root = (state) => state.dashboard;
export const getDashboards = compose(prop('dashboards'), root);