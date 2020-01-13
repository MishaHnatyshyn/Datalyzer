import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styles from './tableColumnsEditForm.module.scss';
import Select from '../shared/Select';
import Checkbox from '../Checkbox';

const options = ['fact', 'dimension'];

const disabledText = "Can't select non numeric fields as fact";

const TableColumnFormRow = ({
  isNumeric,
  name,
  type,
  onNameChange,
  onTypeChange,
  include,
  onIncludeChange,
  inputName,
  options,
}) => (
  <div className={styles.row}>
    <div className={classnames(styles.tableCell)}>
      <input
        name={inputName}
        className={styles.columnNameInput}
        value={name}
        onChange={onNameChange}
      />
    </div>
    <div className={classnames(styles.tableCell)}>
      <Select
        options={options}
        value={type}
        name={inputName}
        onChange={onTypeChange}
        disabled={!isNumeric}
        disabledText={disabledText}
      />
    </div>
    <div className={classnames(styles.tableCell, styles.thirdColumn)}>
      <Checkbox include={include} onIncludeChange={onIncludeChange} name={inputName} />
    </div>
  </div>
);

TableColumnFormRow.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  include: PropTypes.bool.isRequired,
  isNumeric: PropTypes.bool.isRequired,
  onIncludeChange: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({
  options,
});

export default connect(mapStateToProps)(TableColumnFormRow);
