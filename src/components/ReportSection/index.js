import React from 'react';
import PropTypes from 'prop-types';

import styles from './reportSection.module.scss';
import DataContainer from '../shared/DataContainer';
import DragAndDropArea from '../shared/DragAndDropArea';

const DragAndDropPhrase = `Drag and drop 
fact or dimension to build the chart`;

const ReportSection = () => (
  <div className={styles.container}>
    <DataContainer topText="Vizualization" classes={styles.dataContainer}>
      <div className={styles.body}>
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

export default ReportSection;
