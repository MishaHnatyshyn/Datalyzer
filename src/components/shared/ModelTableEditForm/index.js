import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  getSelectedTableColumns,
  getSelectedTableName,
  isSelectedTableAlreadyAdded,
} from '../../../store/createModel/selectors';
import styles from './modelTableEditForm.module.scss';
import Button from '../Button';
import TableColumnsEditForm from '../../TableColumsEditForm';
import {
  addTableInModel,
  cancelAddingTable,
  cancelEditingModelItem,
  changeColumnIncludeValue,
  changeColumnName,
  changeColumnType,
  changeTableName,
} from '../../../store/createModel/actions';
import TableColumnFormRow from '../../TableColumsEditForm/TableColumnFormRow';

const ModelTableEditForm = ({
  name,
  columns,
  save,
  cancel,
  changeTableName,
  changeColumnInclude,
  changeColumnType,
  changeColumnName,
  alreadyAdded,
  cancelEditing,
}) => (
  <form className={styles.form}>
    <div className={styles.formElement}>
      <label className={styles.tableNameLabel} htmlFor={name}>
        Table name
        <input
          id={name}
          className={styles.tableNameInput}
          onChange={changeTableName}
          type="text"
          value={name}
        />
      </label>
    </div>
    <div className={styles.formElement}>
      <p className={styles.tableNameLabel}>Table columns</p>
    </div>
    <div className={classnames(styles.formElement, styles.editColumnsField)}>
      <TableColumnsEditForm>
        <Scrollbars>
          {columns.map((column) => (
            <TableColumnFormRow
              key={column.originalName}
              inputName={column.originalName}
              name={column.givenName}
              type={column.type}
              include={column.include}
              onNameChange={changeColumnName}
              onIncludeChange={changeColumnInclude}
              onTypeChange={changeColumnType}
              isNumeric={column.isNumeric}
            />
          ))}
        </Scrollbars>
      </TableColumnsEditForm>
    </div>
    <div className={styles.formElement}>
      <Button
        classes={[styles.button, styles.closeButton]}
        type="button"
        onclick={alreadyAdded ? cancelEditing : cancel}
      >
        <p>Cancel</p>
      </Button>
      <Button classes={[styles.button, styles.saveButton]} type="button" onclick={save}>
        <p>Save in model</p>
      </Button>
    </div>
  </form>
);

ModelTableEditForm.propTypes = {
  name: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      originalName: PropTypes.string.isRequired,
      givenName: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      include: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  changeTableName: PropTypes.func.isRequired,
  changeColumnInclude: PropTypes.func.isRequired,
  changeColumnType: PropTypes.func.isRequired,
  changeColumnName: PropTypes.func.isRequired,
  alreadyAdded: PropTypes.bool.isRequired,
  cancelEditing: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  name: getSelectedTableName,
  columns: getSelectedTableColumns,
  alreadyAdded: isSelectedTableAlreadyAdded,
});

const mapDispatchToProps = (dispatch) => ({
  save: () => {
    dispatch(addTableInModel());
  },
  cancel: () => {
    dispatch(cancelAddingTable());
  },
  cancelEditing: () => {
    dispatch(cancelEditingModelItem());
  },
  changeTableName: (e) => {
    dispatch(changeTableName(e.target.value));
  },
  changeColumnName: (e) => {
    const { name, value } = e.target;
    dispatch(changeColumnName(name, value));
  },
  changeColumnType: (e) => {
    const { name, value } = e.target;
    dispatch(changeColumnType(name, value));
  },
  changeColumnInclude: (e) => {
    const { name, checked } = e.target;
    dispatch(changeColumnIncludeValue(name, checked));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelTableEditForm);
