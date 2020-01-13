import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataCard from '../shared/DataCard';
import AdminCardDataItem from '../shared/AdminCardDataItem';
import AdminCardDataItemPassword from '../shared/AdminCardDataItemPassword';
import { setConnectionForDeleting } from '../../store/connection/actions';
import { displayCustomPopup } from '../../store/popups/actions';
import PopupTypes from '../../store/popups/popupTypes';
import { setConnectionForEditing, showEditPopup } from '../../store/connectionForm/actions';

const DatabaseDataCard = ({
  db_name,
  name,
  username,
  password,
  host,
  port,
  updateConnection,
  deleteConnection,
  id,
}) => {
  const onDelete = useCallback(() => {
    deleteConnection(id);
  }, [id, deleteConnection]);
  const onUpdate = useCallback(() => {
    updateConnection({
      db_name,
      name,
      username,
      password,
      host,
      port,
      id
    });
  }, [{
    db_name,
    name,
    username,
    password,
    host,
    port,
    id
  }, updateConnection]);
  return (
    <DataCard
      caption={name}
      secondIcon="/images/controls.png"
      thirdIcon="/images/cross.png"
      onSecondButtonClick={onUpdate}
      onThirdButtonClick={onDelete}
    >
      <AdminCardDataItem name="DB name" value={db_name} />
      <AdminCardDataItem name="Host" value={host} />
      <AdminCardDataItem name="Port" value={port} />
      <AdminCardDataItem name="DB user" value={username} />
      <AdminCardDataItemPassword name="BD password" value={password} />
    </DataCard>
  );
};

DatabaseDataCard.propTypes = {
  id: PropTypes.number.isRequired,
  db_name: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
  updateConnection: PropTypes.func.isRequired,
  deleteConnection: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateConnection: (connection) => {
    dispatch(setConnectionForEditing(connection));
    dispatch(showEditPopup());
  },
  deleteConnection: (id) => {
    dispatch(setConnectionForDeleting(id));
    dispatch(displayCustomPopup(PopupTypes.DELETE_CONNECTION));
  },
});

export default connect(null, mapDispatchToProps)(DatabaseDataCard);
