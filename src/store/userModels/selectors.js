import { compose, prop } from 'lodash/fp';

const root = (state) => state.dashboard;
export const getModels = compose(prop('models'), root);
export const getModelsCount = compose(prop('length'), getModels);
export const getModelsCountData = compose(
  (count) => ({ count, isLoading: false }),
  getModelsCount
);
export const getSearchInputText = compose(prop('search'), root);
