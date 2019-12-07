import React from 'react';
import PropTypes from 'prop-types';
import DataCard from '../shared/DataCard';
import AdminCardDataItem from '../shared/AdminCardDataItem';
import AdminCardDataItemPassword from '../shared/AdminCardDataItemPassword';

const DatabaseDataCard = ({
  db_name, name, username, password, host, port
}) => (
  <DataCard caption={name} secondIcon="/images/controls.png" firstIcon="/images/update-arrows.png" thirdIcon="/images/cross.png">
    <AdminCardDataItem name="DB name" value={db_name} />
    <AdminCardDataItem name="Host" value={host} />
    <AdminCardDataItem name="Port" value={port} />
    <AdminCardDataItem name="DB user" value={username} />
    <AdminCardDataItemPassword name="BD password" value={password} />
  </DataCard>
);

DatabaseDataCard.propTypes = {
  db_name: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
};

export default DatabaseDataCard;
