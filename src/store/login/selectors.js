import { compose, prop } from 'lodash/fp';

const root = (state) => state.login;
export const getToken = compose(prop('token'), root);
export const getUsername = compose(prop('username'), root);
export const getPassword = compose(prop('password'), root);
export const isError = compose(prop('error'), root);
export const isLoading = compose(prop('isLoading'), root);
export const getErrorMessage = compose(prop('errorMessage'), root);
