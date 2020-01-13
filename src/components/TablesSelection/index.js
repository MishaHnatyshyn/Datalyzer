import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './tablesSelection.module.scss';
import DataContainer from '../shared/DataContainer';
import DragAndDropArea from '../shared/DragAndDropArea';
import { getModelItems, getSelectedTable, getTables } from '../../store/createModel/selectors';
import {
  editModelItem,
  fetchConnectionTablesData,
  removeTableFromModel,
  setSelectedTable,
} from '../../store/createModel/actions';
import DraggableTableCard from '../shared/DraggableTableCard';
import ModelTableEditForm from '../shared/ModelTableEditForm';

const DragAndDropPhrase = `Drag and drop tables
        you want to include in the model`;

const TablesSelection = ({
  tables,
  setSelectedTable,
  selectedTable,
  modelItems,
  editModelItem,
  removeTableFromModel,
  fetchConnectionTablesData,
}) => {
  function onDragOver(e) {
    e.preventDefault();
  }

  useEffect(() => {
    fetchConnectionTablesData();
  }, []);

  function onDrop(e) {
    const table_name = e.dataTransfer.getData('table_name');
    const table = tables.find((table) => table.tableName === table_name);
    if (table) {
      setSelectedTable(table);
    } else {
      const editedTable = modelItems.find((table) => table.name === table_name);
      editModelItem(editedTable);
    }
  }

  const removeItem = (name) => () => {
    const { originalData } = modelItems.find((table) => table.name === name);
    removeTableFromModel(originalData);
  };

  return (
    <div className={styles.container}>
      <DataContainer topText="DB tables list">
        <div className={styles.body}>
          <Scrollbars>
            {tables.map((table) => (
              <DraggableTableCard
                displayName={table.tableName}
                data={[{ dataKey: 'table_name', value: table.tableName }]}
                key={table.tableName}
              />
            ))}
          </Scrollbars>
        </div>
      </DataContainer>
      <img src="/images/left-arrow-light.png" className={styles.arrow} alt="arrow" />
      <DataContainer topText="Modify data" classes={styles.bigContainer}>
        {selectedTable ? (
          <ModelTableEditForm />
        ) : (
          <DragAndDropArea
            onDrop={onDrop}
            onDragOver={onDragOver}
            classes={styles.body}
            text={DragAndDropPhrase}
          />
        )}
      </DataContainer>
      <img src="/images/left-arrow-light.png" className={styles.arrow} alt="arrow" />
      <DataContainer topText="Selected tables">
        <div className={styles.body}>
          <Scrollbars>
            {modelItems.map((table) => (
              <DraggableTableCard
                displayName={table.name}
                data={[{ dataKey: 'table_name', value: table.name }]}
                onDelete={removeItem(table.name)}
              />
            ))}
          </Scrollbars>
        </div>
      </DataContainer>
    </div>
  );
};

const tablePropTypes = PropTypes.shape({
  tableName: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string.isRequired),
});

const modelItemPropTypes = PropTypes.shape({
  originalData: tablePropTypes,
  name: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      originalName: PropTypes.string.isRequired,
      givenName: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      include: PropTypes.bool.isRequired,
    }),
  ),
  alreadyAdded: PropTypes.bool.isRequired,
});

TablesSelection.propTypes = {
  tables: PropTypes.arrayOf(tablePropTypes).isRequired,
  modelItems: PropTypes.arrayOf(modelItemPropTypes).isRequired,
  setSelectedTable: PropTypes.func.isRequired,
  fetchConnectionTablesData: PropTypes.func.isRequired,
  editModelItem: PropTypes.func.isRequired,
  removeTableFromModel: PropTypes.func.isRequired,
  selectedTable: modelItemPropTypes.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tables: getTables,
  selectedTable: getSelectedTable,
  modelItems: getModelItems,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedTable: (value) => {
    dispatch(setSelectedTable(value));
  },
  editModelItem: (value) => {
    dispatch(editModelItem(value));
  },
  removeTableFromModel: (value) => {
    dispatch(removeTableFromModel(value));
  },
  fetchConnectionTablesData: () => {
    dispatch(fetchConnectionTablesData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TablesSelection);
