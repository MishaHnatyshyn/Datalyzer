import { compose, prop } from 'lodash/fp';

const root = (state) => state.createUser;

export const getUserType = compose(prop('formUserType'), root);
export const getUsername = compose(prop('formUsername'), root);
export const getPassword = compose(prop('formPassword'), root);
export const getUserDescription = compose(prop('formDescription'), root);
export const getPasswordRepeat = compose(prop('formPasswordRepeat'), root);
export const getErrorMessage = compose(prop('errorMessage'), root);
export const getVisible = compose(prop('isVisible'), root);

export const isError = compose(prop('error'), root);
export const isLoading = compose(prop('isLoading'), root);

export const getUserForEditing = compose(prop('userForEditing'), root);
