import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import DataContainer from '../shared/DataContainer';
import ModelMenuLink from '../ModelMenuLink';
import styles from './reportDataSection.module.scss';
import {
  getDimensionsForDisplay,
  getFactsForDisplay,
  getReportModels,
  getSelectedDimension,
  getSelectedFact,
  getSelectedModel,
} from '../../store/createReport/selectors';
import {
  deleteDimension,
  deleteFact,
  deselectModel,
  fetchModelsForReport,
  selectModel,
} from '../../store/createReport/actions';
import ReportDataFieldsList from './ReportDataFieldsList';

const ReportDataSection = ({
  selectedModel,
  selectModel,
  deselectModel,
  fetchModels,
  models,
  facts,
  dimensions,
  selectedDimension,
  selectedFact,
  deleteFact,
  deleteDimension,
}) => {
  useEffect(() => {
    fetchModels();
  }, []);
  return (
    <div className={styles.container}>
      <DataContainer
        topText={selectedModel ? selectedModel.name : 'Models'}
        classes={styles.dataContainer}
      >
        <div className={classnames(styles.body, selectedModel ? styles.displayRightPart : '')}>
          <div className={styles.leftPart}>
            <Scrollbars>
              {models.map((model) => (
                <ModelMenuLink onClick={selectModel} model={model}>
                  {model.name}
                </ModelMenuLink>
              ))}
            </Scrollbars>
          </div>
          <div className={styles.rightPart}>
            <button onClick={deselectModel} className={styles.arrowBackButton}>
              <img src="/images/left-arrow-light.png" alt="back" className={styles.arrowBack} />
            </button>
            <p className={styles.caption}>Dimensions</p>
            <ReportDataFieldsList
              data={dimensions}
              type="dimension"
              selectedValue={selectedDimension}
              onDelete={deleteDimension}
            />
            <p className={styles.caption}>Facts</p>
            <ReportDataFieldsList
              data={facts}
              type="fact"
              selectedValue={selectedFact}
              onDelete={deleteFact}
            />
          </div>
        </div>
      </DataContainer>
    </div>
  );
};

ReportDataSection.propTypes = {
  selectedModel: PropTypes.oneOf([
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          relations: PropTypes.arrayOf(PropTypes.string),
          fields: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              name: PropTypes.string,
              type: PropTypes.string,
            }),
          ),
        }),
      ),
    }),
    null,
  ]).isRequired,
  selectedFact: PropTypes.number.isRequired,
  selectedDimension: PropTypes.number.isRequired,
  selectModel: PropTypes.func.isRequired,
  deleteFact: PropTypes.func.isRequired,
  deleteDimension: PropTypes.func.isRequired,
  deselectModel: PropTypes.func.isRequired,
  fetchModels: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          relations: PropTypes.arrayOf(PropTypes.string),
          fields: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              name: PropTypes.string,
              type: PropTypes.string,
            }),
          ),
        }),
      ),
    }),
  ).isRequired,
  dimensions: PropTypes.oneOf([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
      }),
    ),
    null,
  ]).isRequired,
  facts: PropTypes.oneOf([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
      }),
    ),
    null,
  ]).isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedModel: getSelectedModel,
  models: getReportModels,
  facts: getFactsForDisplay,
  dimensions: getDimensionsForDisplay,
  selectedFact: getSelectedFact,
  selectedDimension: getSelectedDimension,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFact: () => {
    dispatch(deleteFact());
  },
  deleteDimension: () => {
    dispatch(deleteDimension());
  },
  selectModel: (modelId) => {
    dispatch(selectModel(modelId));
  },
  deselectModel: () => {
    dispatch(deselectModel());
  },
  fetchModels: () => {
    dispatch(fetchModelsForReport());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDataSection);
