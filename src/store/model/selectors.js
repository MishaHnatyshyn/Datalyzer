import { compose, prop } from 'lodash/fp';
import { createSelector } from 'reselect';

const root = (state) => state.models;
export const getLastLoadedPage = compose(prop('lastLoadedPage'), root);
export const getCurrentPage = compose(prop('currentPage'), root);
export const getItemsPerPage = compose(prop('itemsPerPage'), root);
export const getSearchInputText = compose(prop('search'), root);
export const getModelsCountData = compose(prop('totalModels'), root);
export const getModels = compose(prop('models'), root);
export const isError = compose(prop('error'), root);
export const isLoading = compose(prop('isLoading'), root);
export const hasNextPage = compose(prop('hasNextPage'), root);
export const getModelForDeleting = compose(prop('modelForDeleting'), root);

export const getName = compose(prop('name'), root);
export const getErrorMessage = compose(prop('errorMessage'), root);
export const getModelForRenaming = compose(prop('modelForRenaming'), root);

export const getUserModelsCount = compose(prop('length'), getModels);
export const getUserModelCountData = compose(
  (count) => ({ count, isLoading: false }),
  getUserModelsCount
);

export const getPaging = createSelector(
  [getCurrentPage, getLastLoadedPage],
  (currentPage, lastLoadedPage) => ({ currentPage, lastLoadedPage }),
);

export const getDisplayedModels = createSelector(
  [getCurrentPage, getItemsPerPage, getModels],
  (currentPage, itemsPerPage, models) => models.slice(
    (currentPage - 1) * itemsPerPage, itemsPerPage
  ),
);

export const getModelsSearchPayload = createSelector(
  [getCurrentPage, getItemsPerPage, getSearchInputText],
  (currentPage, itemsPerPage, search) => ({ currentPage, itemsPerPage, search }),
);
