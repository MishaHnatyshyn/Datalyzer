import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminDatabasesPageHeader from './AdminDatabasesPageHeader';
import DatabaseDataCard from '../../components/DatabaseDataCard';
import DataCardGrid from '../../components/shared/DataCardGrid';

const connections = [
  {
    db_name: 'db_name',
    connection_name: 'connection_name_misha_dno',
    username: 'username',
    password: 'password',
    host: 'host',
    port: 'port'
  },
  {
    db_name: 'db_name',
    connection_name: 'connection_name',
    username: 'username',
    password: 'password',
    host: 'host',
    port: 'port'
  },
  {
    db_name: 'db_name',
    connection_name: 'connection_name',
    username: 'username',
    password: 'password',
    host: 'host',
    port: 'port'
  },
];

const DatabasesAdmin = ({ connections }) => (
  <div>
    <AdminDatabasesPageHeader />
    <DataCardGrid>
      {connections.map((connection) => <DatabaseDataCard {...connection} />)}
    </DataCardGrid>
  </div>
);

DatabasesAdmin.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({
    db_name: PropTypes.string,
    connection_name: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    host: PropTypes.string,
    port: PropTypes.string,
  })).isRequired
};

const mapStateToProps = () => ({
  connections,
});

export default connect(mapStateToProps)(DatabasesAdmin);
