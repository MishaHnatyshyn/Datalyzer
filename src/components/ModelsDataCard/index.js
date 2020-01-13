import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './modelsDataCard.module.scss';
import DataCard from '../shared/DataCard';
import AdminCardDataItem from '../shared/AdminCardDataItem';
import { displayCustomPopup } from '../../store/popups/actions';
import PopupTypes from '../../store/popups/popupTypes';
import { setModelForDeleting, setModelForRenaming } from '../../store/model/actions';

const getStatusName = (isActive) => (isActive ? 'active' : 'disabled');

const ModelsDataCard = ({
  name,
  connection,
  users,
  tables,
  created,
  fields,
  usages,
  active,
  updateModel,
  deleteModel,
  id,
}) => {
  const status = useMemo(() => getStatusName(active), [active]);
  const formattedCreationDate = useMemo(() => new Date(created).toLocaleDateString(), [created]);
  const onDelete = useCallback(() => {
    deleteModel(id);
  }, [id, deleteModel]);
  const onUpdate = useCallback(() => {
    updateModel(id);
  }, [id, updateModel]);
  return (
    <DataCard
      caption={name}
      secondIcon="/images/controls.png"
      thirdIcon="/images/cross.png"
      onSecondButtonClick={onUpdate}
      onThirdButtonClick={onDelete}
    >
      <AdminCardDataItem name="Connection name" value={connection} />
      <AdminCardDataItem name="Users" value={users} />
      <AdminCardDataItem name="Tables" value={tables} />
      <AdminCardDataItem name="Created" value={formattedCreationDate} />
      <AdminCardDataItem name="Rows" value={fields} />
      <AdminCardDataItem name="Uses" value={usages} />
      <AdminCardDataItem name="Status" value={status} classes={[styles.text, styles[status]]} />
    </DataCard>
  );
};

ModelsDataCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  connection: PropTypes.string.isRequired,
  users: PropTypes.string.isRequired,
  tables: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  fields: PropTypes.string.isRequired,
  usages: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  updateModel: PropTypes.func.isRequired,
  deleteModel: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateModel: (id) => {
    dispatch(setModelForRenaming(id));
    dispatch(displayCustomPopup(PopupTypes.RENAME_MODEL));
  },
  deleteModel: (id) => {
    dispatch(setModelForDeleting(id));
    dispatch(displayCustomPopup(PopupTypes.DELETE_MODEL));
  },
});

export default connect(null, mapDispatchToProps)(ModelsDataCard);
