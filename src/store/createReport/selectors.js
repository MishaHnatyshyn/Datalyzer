import {
  compose, prop, map, flatten, filter
} from 'lodash/fp';
import { createSelector } from 'reselect';

const root = (state) => state.createReport;

export const getSelectedModel = compose(prop('selectedModel'), root);
export const getSelectedDashboard = compose(prop('selectedDashboard'), root);
export const getCurrentStep = compose(prop('step'), root);
export const getSelectedFact = compose(prop('selectedFact'), root);
export const getSelectedDimension = compose(prop('selectedDimension'), root);
export const getReportModels = compose(prop('models'), root);
export const getModelsCount = compose(prop('length'), getReportModels);
export const getModelsCountData = compose(
  (count) => ({ count, isLoading: false }),
  getModelsCount
);

// export const getSelectedModelById

export const isChartSelected = createSelector([
  getSelectedFact, getSelectedDimension
], (fact, dimension) => fact && dimension);

export const getNewDashboardName = compose(prop('newDashboardName'), root);

export const getSelectedModelFields = compose(
  flatten,
  map((item) => item.fields.map((field) => ({
    ...field, name: `${item.name}: ${field.name}`, modelItemId: item.id, relations: item.relations, originalName: field.name
  }))),
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

export const getSelectedDimensionData = createSelector([
  getSelectedDimension,
  getDimensions,
], (dimensionId, fields) => fields.find((_) => _.id === dimensionId));

export const getSelectedFactData = createSelector([
  getSelectedFact,
  getFacts,
], (factId, fields) => fields.find((_) => _.id === factId));

export const getFactsForDisplay = createSelector([
  getFacts,
  getSelectedDimensionData,
  getSelectedFact
], (facts, selectedDimension, selectedFact) => facts.map((fact) => {
  const isFromSameModel = selectedDimension && fact.modelItemId === selectedDimension.modelItemId;
  const areRelated = selectedDimension && fact.relations
    .filter((factRelation) => selectedDimension.relations.includes(factRelation)).length > 0;
  const isSelected = selectedFact === fact.id;
  const areConnected = isFromSameModel || areRelated;

  return {
    ...fact,
    enabled: !selectedFact && ((selectedDimension && areConnected) || !selectedDimension),
    active: isSelected
  };
}));

export const getDimensionsForDisplay = createSelector([
  getDimensions,
  getSelectedFactData,
  getSelectedDimension
], (dimensions, selectedFact, selectedDimension) => dimensions.map((dimension) => {
  const isFromSameModel = selectedFact && dimension.modelItemId === selectedFact.modelItemId;
  const areRelated = selectedFact && dimension.relations
    .filter((dimensionRelation) => selectedFact.relations.includes(dimensionRelation)).length > 0;
  const isSelected = selectedDimension === dimension.id;
  const areConnected = isFromSameModel || areRelated;
  return {
    ...dimension,
    enabled: !selectedDimension && ((selectedFact && areConnected) || !selectedFact),
    active: isSelected
  };
}));

export const getChartData = compose(prop('reportData'), root);
export const getChartType = compose(prop('selectedChartType'), root);
export const isChartDataLoading = compose(prop('reportDataLoading'), root);
