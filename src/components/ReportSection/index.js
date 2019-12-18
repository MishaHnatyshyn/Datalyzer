import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './reportSection.module.scss';
import DataContainer from '../shared/DataContainer';
import DragAndDropArea from '../shared/DragAndDropArea';
import { selectChartType, selectDimension, selectFact } from '../../store/createReport/actions';

const DragAndDropPhrase = `Drag and drop 
fact or dimension to build the chart`;

const chartTypes = [
  { name: '1', id: 1, img: '/images/chartTypes/1.png' },
  { name: '2', id: 2, img: '/images/chartTypes/2.png' },
  { name: '3', id: 3, img: '/images/chartTypes/3.png' },
  { name: '4', id: 4, img: '/images/chartTypes/4.png' },
  { name: '5', id: 5, img: '/images/chartTypes/5.png' },
  { name: '6', id: 6, img: '/images/chartTypes/6.png' },
  { name: '7', id: 7, img: '/images/chartTypes/7.png' },
  { name: '8', id: 8, img: '/images/chartTypes/8.png' },
  { name: '9', id: 9, img: '/images/chartTypes/9.png' },
];

function onDragOver(e) {
  e.preventDefault();
}

const ReportSection = ({
                         chartTypes, selectFact, selectDimension, selectedChartType
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
          <DragAndDropArea
            onDrop={handleDrop}
            onDragOver={onDragOver}
            text={DragAndDropPhrase}
            classes={styles.dragAndDropArea}
          />
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
};

const mapStateToProps = () => ({
  chartTypes
});

const mapDispatchToProps = (dispatch) => ({
  selectFact: (id) => { dispatch(selectFact(id)); },
  selectDimension: (id) => { dispatch(selectDimension(id)); },
  selectedChartType: (id) => { dispatch(selectChartType(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportSection);
