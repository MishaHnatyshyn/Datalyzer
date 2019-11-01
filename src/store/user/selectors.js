import { compose, prop } from 'lodash/fp';

const root = (state) => state.user;
export const getUsername = compose(prop('username'), root);
export const getType = compose(prop('userType'), root);
export const getId = compose(prop('userId'), root);
export const getUser = root;
