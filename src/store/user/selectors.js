import { compose, prop } from 'lodash/fp';

const root = (state) => state.user;
export const getUsername = compose(prop('username'), root);
export const getUserType = compose(prop('userType'), root);
export const getUserId = compose(prop('userId'), root);
export const getOldPassword = compose(prop('oldPassword'), root);
export const getPassword = compose(prop('password'), root);
export const getPasswordRepeat = compose(prop('passwordRepeat'), root);
export const isError = compose(prop('error'), root);
export const getErrorMessage = compose(prop('errorMessage'), root);
export const getUser = root;
