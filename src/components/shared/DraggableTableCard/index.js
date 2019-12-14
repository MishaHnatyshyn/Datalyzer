import React from 'react';
import PropTypes from 'prop-types';
import Draggable from '../Draggable';
import TableCard from '../TableCard';

const DraggableTableCard = ({ table_name, draggable, ...props }) => (
  <Draggable value={table_name} dataKey="table_name" draggable={draggable}>
    <TableCard table_name={table_name} {...props} />
  </Draggable>
);

DraggableTableCard.defaultProps = {
  draggable: true
};

DraggableTableCard.propTypes = {
  table_name: PropTypes.string.isRequired,
  draggable: PropTypes.bool
};

export default DraggableTableCard;
