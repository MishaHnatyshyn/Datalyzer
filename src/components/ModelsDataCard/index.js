import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './modelsDataCard.module.scss';
import DataCard from '../shared/DataCard';
import AdminCardDataItem from '../shared/AdminCardDataItem';

const getStatusName = (isActive) => (isActive ? 'active' : 'disabled');

const ModelsDataCard = ({
  name, connection, users, tables, created, fields, usages, active
}) => {
  const status = useMemo(
    () => getStatusName(active),
    [active]
  );
  const formattedCreationDate = useMemo(
    () => new Date(created).toLocaleDateString(),
    [created]
  );
  return (
    <DataCard caption={name} firstIcon="/images/security.png" secondIcon="/images/update-arrows.png" thirdIcon="/images/cross.png">
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
  connection: PropTypes.string.isRequired,
  users: PropTypes.string.isRequired,
  tables: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  fields: PropTypes.string.isRequired,
  usages: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
};

export default ModelsDataCard;
