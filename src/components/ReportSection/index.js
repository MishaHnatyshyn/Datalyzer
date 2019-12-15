import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './reportSection.module.scss';
import DataContainer from '../shared/DataContainer';
import DragAndDropArea from '../shared/DragAndDropArea';

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

const ReportSection = ({ chartTypes }) => (
  <div className={styles.container}>
    <DataContainer topText="Vizualization" classes={styles.dataContainer}>
      <div className={styles.body}>
        <div>
          <p className={styles.text}>Choose type of the chart:</p>
          <div className={styles.chartTypesContainer}>
            {chartTypes.map((chart) => (
              <button className={styles.chartType}>
                <img src={chart.img} alt={chart.name} />
              </button>
            ))}
          </div>
        </div>
        <DragAndDropArea
          onDrop={() => {}}
          onDragOver={() => {}}
          text={DragAndDropPhrase}
          classes={styles.dragAndDropArea}
        />
      </div>
    </DataContainer>
  </div>
);

ReportSection.propTypes = {
  chartTypes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    img: PropTypes.string
  })).isRequired
};

const mapStateToProps = () => ({
  chartTypes
});

export default connect(mapStateToProps)(ReportSection);
