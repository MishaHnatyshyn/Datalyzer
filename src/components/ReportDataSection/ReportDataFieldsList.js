import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import DraggableTableCard from '../shared/DraggableTableCard';
import styles from './reportDataSection.module.scss';

const ReportDataFieldsList = ({
  data, type, onDelete
}) => (
  <div>
    {
      data && data.length
        ? (
          <Scrollbars autoHeight={240} autoHeightMin={240}>
            {data.map(
              ({
                name, id, active, enabled
              }) => (
                <DraggableTableCard
                  displayName={name}
                  data={[
                    { dataKey: 'id', value: id },
                    { dataKey: 'type', value: type },
                  ]}
                  draggable={enabled && !active}
                  classes={active ? styles.activeCard : !enabled ? styles.disabledCard : ''}
                  onDelete={active ? onDelete : null}
                />
              )
            )}
          </Scrollbars>
        )
        : (
          <p className={styles.noFoundText}>
            {`No ${type}s`}
          </p>
        )
      }
  </div>
);

ReportDataFieldsList.propTypes = {
  data: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string
  })), null]).isRequired,
  type: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReportDataFieldsList;
