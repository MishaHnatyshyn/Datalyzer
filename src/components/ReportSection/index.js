import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './reportSection.module.scss';
import DataContainer from '../shared/DataContainer';
import DragAndDropArea from '../shared/DragAndDropArea';
import {
  fetchReportFieldValues, selectChartType, selectDimension, selectFact
} from '../../store/createReport/actions';
import NewChartContainer from './NewChartContainer';
import { isChartSelected } from '../../store/createReport/selectors';

const DragAndDropPhrase = `Drag and drop 
fact or dimension to build the chart`;

const chartTypes = [
  { name: 'Bar', id: 1, img: '/images/chartTypes/3.png' },
  { name: 'HorizontalBar', id: 2, img: '/images/chartTypes/4.png' },
  { name: 'Line', id: 3, img: '/images/chartTypes/5.png' },
  { name: 'Pie', id: 4, img: '/images/chartTypes/9.png' },
  { name: 'Doughnut', id: 5, img: '/images/chartTypes/7.png' },
  { name: 'Radar', id: 6, img: '/images/chartTypes/2.png' },
  // { name: '7', id: 7, img: '/images/chartTypes/7.png' },
  // { name: '8', id: 8, img: '/images/chartTypes/8.png' },
  // { name: '9', id: 9, img: '/images/chartTypes/2.png' },
];

function onDragOver(e) {
  e.preventDefault();
}

const ReportSection = ({
  chartTypes, selectFact, selectDimension, selectedChartType, isChartSelected
}) => {
  const handleDrop = useCallback((e) => {
    const id = parseInt(e.dataTransfer.getData('id'), 10);
    const type = e.dataTransfer.getData('type');
    if (type === 'fact') {
      selectFact(id);
    } else if (type === 'dimension') {
      selectDimension(id);
    }
  }, []);
  return (
    <div className={styles.container}>
      <DataContainer topText="Vizualization" classes={styles.dataContainer}>
        <div className={styles.body}>
          <div>
            <p className={styles.text}>Choose type of the chart:</p>
            <div className={styles.chartTypesContainer}>
              {chartTypes.map((chart) => (
                <button
                  className={styles.chartType}
                  onClick={selectedChartType.bind(null, chart.id)}
                >
                  <img src={chart.img} alt={chart.name} />
                </button>
              ))}
            </div>
          </div>
          { isChartSelected
            ? (<NewChartContainer />)
            : (
              <DragAndDropArea
                onDrop={handleDrop}
                onDragOver={onDragOver}
                text={DragAndDropPhrase}
                classes={styles.dragAndDropArea}
              />
            )}

        </div>
      </DataContainer>
    </div>
  );
};

ReportSection.propTypes = {
  chartTypes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    img: PropTypes.string
  })).isRequired,
  selectDimension: PropTypes.func.isRequired,
  selectFact: PropTypes.func.isRequired,
  selectedChartType: PropTypes.func.isRequired,
  isChartSelected: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  chartTypes,
  isChartSelected: isChartSelected(state)
});

const mapDispatchToProps = (dispatch) => ({
  selectFact: (id) => {
    dispatch(selectFact(id));
    dispatch(fetchReportFieldValues());
  },
  selectDimension: (id) => {
    dispatch(selectDimension(id));
    dispatch(fetchReportFieldValues());
  },
  selectedChartType: (id) => { dispatch(selectChartType(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportSection);
