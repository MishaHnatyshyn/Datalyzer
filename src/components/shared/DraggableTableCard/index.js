import React from 'react';
import PropTypes from 'prop-types';
import Draggable from '../Draggable';
import TableCard from '../TableCard';

const DraggableTableCard = ({ table_name, ...props }) => (
  <Draggable value={table_name} dataKey="table_name">
    <TableCard table_name={table_name} {...props} />
  </Draggable>
);

DraggableTableCard.propTypes = {
  table_name: PropTypes.string.isRequired,
};

export default DraggableTableCard;
