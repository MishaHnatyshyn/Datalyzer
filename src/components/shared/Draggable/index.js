import React from 'react';
import PropTypes from 'prop-types';
import styles from './draggable.module.scss';

const Draggable = ({
  children, value, dataKey, draggable
}) => {
  function drag(e) {
    e.dataTransfer.setData(dataKey, value);
  }

  function noAllowDrop(e) {
    e.stopPropagation();
  }

  return (
    <div
      draggable={draggable}
      onDragStart={drag}
      onDragOver={noAllowDrop}
      className={styles.container}
    >
      {children}
    </div>
  );
};

Draggable.defaultProps = {
  draggable: true
};

Draggable.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  draggable: PropTypes.bool
};

export default Draggable;
