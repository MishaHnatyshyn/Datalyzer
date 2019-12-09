import { compose, prop } from 'lodash/fp';
import { createSelector } from 'reselect';

const root = (state) => state.connections;
export const getLastLoadedPage = compose(prop('lastLoadedPage'), root);
export const getCurrentPage = compose(prop('currentPage'), root);
export const getItemsPerPage = compose(prop('itemsPerPage'), root);
export const getSearchInputText = compose(prop('search'), root);
export const getConnectionsCountData = compose(prop('totalConnections'), root);
export const getConnections = compose(prop('connections'), root);
export const isError = compose(prop('error'), root);
export const isLoading = compose(prop('isLoading'), root);
export const hasNextPage = compose(prop('hasNextPage'), root);
export const getConnectionForDeleting = compose(prop('connectionForDeleting'), root);

export const getPaging = createSelector(
  [getCurrentPage, getLastLoadedPage],
  (currentPage, lastLoadedPage) => ({ currentPage, lastLoadedPage })
);

export const getDisplayedConnections = createSelector(
  [getCurrentPage, getItemsPerPage, getConnections],
  (currentPage, itemsPerPage, connections) => (
    connections.slice((currentPage - 1) * itemsPerPage, itemsPerPage)
  )
);

export const getConnectionsSearchPayload = createSelector(
  [getCurrentPage, getItemsPerPage, getSearchInputText],
  (currentPage, itemsPerPage, search) => ({ currentPage, itemsPerPage, search })
);
