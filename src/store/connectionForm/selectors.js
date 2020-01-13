import { compose, prop } from 'lodash/fp';

const root = (state) => state.connectionForms;
export const isError = compose(prop('error'), root);
export const isLoading = compose(prop('isLoading'), root);

export const getType = compose(prop('type'), root);
export const getUsername = compose(prop('username'), root);
export const getPassword = compose(prop('password'), root);
export const getPort = compose(prop('port'), root);
export const getNameDB = compose(prop('nameDB'), root);
export const getNameConnection = compose(prop('nameConnection'), root);
export const getHost = compose(prop('host'), root);
export const getVisible = compose(prop('isVisible'), root);
export const getErrorMessage = compose(prop('errorMessage'), root);
export const getConnectionForEditing = compose(prop('connectionForEditing'), root);
