// eslint-disable-next-line import/prefer-default-export
import store from '../store';
import { getUserType } from '../store/user/selectors';

export const createHomeRoute = () => `/${getUserType(store.getState())}/home`;
export const createModelsRoute = () => `/${getUserType(store.getState())}/models`;
