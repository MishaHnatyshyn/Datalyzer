import { compose, prop } from 'lodash/fp';
import { createSelector } from 'reselect';

const root = (state) => state.adminUsers;
export const getLastLoadedPage = compose(prop('lastLoadedPage'), root);
export const getCurrentPage = compose(prop('currentPage'), root);
export const getItemsPerPage = compose(prop('itemsPerPage'), root);
export const getSearchInputText = compose(prop('search'), root);

export const getUserType = compose(prop('formUserType'), root);
export const getUsername = compose(prop('formUsername'), root);
export const getPassword = compose(prop('formPassword'), root);
export const getUserDescription = compose(prop('formDescription'), root);
export const getPasswordRepeat = compose(prop('formPasswordRepeat'), root);
export const getErrorMessage = compose(prop('errorMessage'), root);
export const getVisible = compose(prop('isVisible'), root);

export const getUsersCountData = compose(prop('totalUsers'), root);
export const getUsers = compose(prop('users'), root);
export const hasNextPage = compose(prop('hasNextPage'), root);
export const isError = compose(prop('error'), root);
export const isLoading = compose(prop('isLoading'), root)``;
export const getUserForDeleting = compose(prop('userForDeleting'), root);

export const getPaging = createSelector(
  [getCurrentPage, getLastLoadedPage],
  (currentPage, lastLoadedPage) => ({ currentPage, lastLoadedPage })
);

export const getDisplayedUsers = createSelector(
  [getCurrentPage, getItemsPerPage, getUsers],
  (currentPage, itemsPerPage, users) => users.slice((currentPage - 1) * itemsPerPage, itemsPerPage)
);

export const getUsersSearchPayload = createSelector(
  [getCurrentPage, getItemsPerPage, getSearchInputText],
  (currentPage, itemsPerPage, search) => ({ currentPage, itemsPerPage, search })
);
