import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './dragAndDropArea.module.scss';

const DragAndDropArea = ({ onDragOver, onDrop, classes }) => (
  <div className={classnames(classes, styles.dragAndDropContainer)}>
    <div
      className={styles.dropContainer}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e)}
    >
      <img src="/images/file.png" alt="file" />
      <p className={styles.dragAndDropText}>
        `Drag and drop tables
        you want to include in the model`
      </p>
    </div>
  </div>
);

DragAndDropArea.defaultProps = {
  classes: ''
};

DragAndDropArea.propTypes = {
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  classes: PropTypes.string
};

export default DragAndDropArea;
