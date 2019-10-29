import { compose, prop } from 'lodash/fp';

const root = (state) => state.login;
export const getUsername = compose(prop('username'), root);
export const getPassword = compose(prop('password'), root);
