import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Loader from '../shared/Loader';
import styles from './reportSection.module.scss';
import {
  getChartData,
  getChartType,
  getSelectedDimensionData,
  getSelectedFactData,
  isChartDataLoading
} from '../../store/createReport/selectors';
import Graph from '../Graph';
import graphTypes from '../../config/graphtypes';


const NewChartContainer = ({
  data, fact, dimension, chartType, isLoading
}) => {
  const viewPortRef = createRef();
  return (
    <div className={styles.newChartContainer} ref={viewPortRef}>
      { isLoading && <Loader classes={styles.loader} />}
      { data.length && (
      <Graph
        type={graphTypes[chartType]}
        disableMoveAndScale
        startLeftPosition={0}
        startTopPosition={0}
        className={styles.graph}
        startWidth="100%"
        items={data}
        facts={[fact.originalName]}
        dimensions={[dimension.originalName]}
        viewPortRef={viewPortRef}
      />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  data: getChartData,
  chartType: getChartType,
  isLoading: isChartDataLoading,
  fact: getSelectedFactData,
  dimension: getSelectedDimensionData,
});

NewChartContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
  fact: PropTypes.shape.isRequired,
  dimension: PropTypes.shape.isRequired,
  chartType: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(NewChartContainer);
