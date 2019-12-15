import {
  compose, prop, map, flatten, filter
} from 'lodash/fp';

const root = (state) => state.createReport;

export const getSelectedModel = compose(prop('selectedModel'), root);
export const getReportModels = compose(prop('models'), root);

export const getSelectedModelFields = compose(
  flatten,
  map((item) => item.fields),
  prop('items'),
  getSelectedModel
);

export const getDimensions = compose(
  filter((field) => field.type === 'dimension'),
  getSelectedModelFields
);
export const getFacts = compose(
  filter((field) => field.type === 'fact'),
  getSelectedModelFields
);
