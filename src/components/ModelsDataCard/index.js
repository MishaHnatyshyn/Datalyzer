import React from 'react';
import PropTypes from 'prop-types';
import styles from './modelsDataCard.module.scss';
import DataCard from '../shared/DataCard';
import AdminCardDataItem from '../shared/AdminCardDataItem';

const ModelsDataCard = ({
  name, connection_name, users, tables, created_at, rows, usages, status
}) => (
  <DataCard caption={name} firstIcon="/images/security.png" secondIcon="/images/update-arrows.png" thirdIcon="/images/cross.png">
    <AdminCardDataItem name="Connection name" value={connection_name} />
    <AdminCardDataItem name="Users" value={users} />
    <AdminCardDataItem name="Tables" value={tables} />
    <AdminCardDataItem name="Created" value={created_at} />
    <AdminCardDataItem name="Rows" value={rows} />
    <AdminCardDataItem name="Uses" value={usages} />
    <AdminCardDataItem name="Status" value={status} classes={status === 'active' ? styles.active : styles.disabled} />
  </DataCard>
);

ModelsDataCard.propTypes = {
  name: PropTypes.string.isRequired,
  connection_name: PropTypes.string.isRequired,
  users: PropTypes.string.isRequired,
  tables: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  usages: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default ModelsDataCard;
