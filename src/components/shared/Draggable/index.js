import React from 'react';
import PropTypes from 'prop-types';
import styles from './draggable.module.scss';

const Draggable = ({
  children, draggable, data
}) => {
  function drag(e) {
    data.forEach(({ dataKey, value }) => {
      e.dataTransfer.setData(dataKey, value);
    });
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
  draggable: true,
  data: []
};

Draggable.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
  })),
  draggable: PropTypes.bool
};

export default Draggable;
