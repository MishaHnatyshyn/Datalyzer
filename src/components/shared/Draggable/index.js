import React from 'react';
import PropTypes from 'prop-types';
import styles from './draggable.module.scss';

const Draggable = ({ children, value, dataKey }) => {
  function drag(e) {
    e.dataTransfer.setData(dataKey, value);
  }

  function noAllowDrop(e) {
    e.stopPropagation();
  }

  return (
    <div draggable onDragStart={drag} onDragOver={noAllowDrop} className={styles.container}>
      {children}
    </div>
  );
};

Draggable.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
};

export default Draggable;
