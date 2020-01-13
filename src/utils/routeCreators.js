// eslint-disable-next-line import/prefer-default-export
import store from '../store';
import { getUserType } from '../store/user/selectors';

export const createHomeRoute = () => `/${getUserType(store.getState())}/home`;
export const createModelsRoute = () => `/${getUserType(store.getState())}/models`;
export const createConnectionTablesDataRoute = (id) => `/connections/${id}/tables`;
export const createConnectionRelationsDataRoute = (id) => `/connections/${id}/relations`;
export const createConnectionDeleteRoute = (id) => `/connections/${id}`;
export const createModelDeleteRoute = (id) => `/models/${id}`;
export const createUserDeleteRoute = (id) => `/users/${id}`;
export const createModelRenameRoute = (id) => `/models/${id}`;
export const createUserEditRoute = (id) => `/users/${id}`;
export const createDashboardDeleteRoute = (id) => `/dashboards/${id}`;
export const createConnectionEditRoute = (id) => `/connections/${id}`;
