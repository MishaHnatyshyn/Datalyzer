import React from 'react';
import PropTypes from 'prop-types';
import Draggable from '../Draggable';
import TableCard from '../TableCard';

const DraggableTableCard = ({
  displayName, data, draggable, classes, ...props
}) => (
  <Draggable data={data} draggable={draggable}>
    <TableCard table_name={displayName} classes={classes} {...props} />
  </Draggable>
);

DraggableTableCard.defaultProps = {
  draggable: true,
  data: [],
  classes: ''
};

DraggableTableCard.propTypes = {
  displayName: PropTypes.string.isRequired,
  draggable: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
  })),
  classes: PropTypes.string
};

export default DraggableTableCard;
