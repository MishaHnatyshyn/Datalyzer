import { compose, prop } from 'lodash/fp';

const root = (state) => state.user;
export const getUsername = compose(prop('username'), root);
export const getUserType = compose(prop('userType'), root);
export const getUserId = compose(prop('userId'), root);
export const getUser = root;
