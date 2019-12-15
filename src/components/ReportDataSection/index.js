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
  getDimensions, getFacts, getReportModels, getSelectedModel
} from '../../store/createReport/selectors';
import { deselectModel, fetchModelsForReport, selectModel } from '../../store/createReport/actions';
import DraggableTableCard from '../shared/DraggableTableCard';

const ReportDataSection = ({
  selectedModel, selectModel, deselectModel, fetchModels, models, facts, dimensions
}) => {
  useEffect(() => {
    fetchModels();
  }, []);
  return (
    <div className={styles.container}>
      <DataContainer topText={selectedModel ? selectedModel.name : 'Models'} classes={styles.dataContainer}>
        <div className={classnames(styles.body, selectedModel ? styles.displayRightPart : '')}>
          <div className={styles.leftPart}>
            <Scrollbars>
              {models.map((model) => (
                <ModelMenuLink
                  onClick={selectModel}
                  model={model}
                >
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
            <div>
              {
                dimensions && dimensions.length
                  ? (
                    <Scrollbars autoHeight={240} autoHeightMin={240}>
                      {dimensions.map(
                        (dimension) => <DraggableTableCard table_name={dimension.name} />
                      )}
                    </Scrollbars>
                  )
                  : <p className={styles.noFoundText}>No dimensions</p>
              }
            </div>
            <p className={styles.caption}>Facts</p>
            <div>
              {
                facts && facts.length
                  ? (
                    <Scrollbars autoHeight={240} autoHeightMin={240}>
                      {facts.map(
                        (fact) => <DraggableTableCard table_name={fact.name} />
                      )}
                      {' '}

                    </Scrollbars>
                  )
                  : <p className={styles.noFoundText}>No facts</p>
              }
            </div>
          </div>
        </div>

      </DataContainer>
    </div>
  );
};

ReportDataSection.propTypes = {
  selectedModel: PropTypes.oneOf([PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      relations: PropTypes.arrayOf(PropTypes.string),
      fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string
      }))
    }))
  }), null]).isRequired,
  selectModel: PropTypes.func.isRequired,
  deselectModel: PropTypes.func.isRequired,
  fetchModels: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      relations: PropTypes.arrayOf(PropTypes.string),
      fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string
      }))
    }))
  })).isRequired,
  dimensions: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string
  })), null]).isRequired,
  facts: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      type: PropTypes.string
    })), null
  ]).isRequired
};

const mapStateToProps = createStructuredSelector({
  selectedModel: getSelectedModel,
  models: getReportModels,
  facts: getFacts,
  dimensions: getDimensions
});

const mapDispatchToProps = (dispatch) => ({
  selectModel: (modelId) => { dispatch(selectModel(modelId)); },
  deselectModel: () => { dispatch(deselectModel()); },
  fetchModels: () => { dispatch(fetchModelsForReport()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportDataSection);
