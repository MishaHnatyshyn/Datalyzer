import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import AdminDatabasesPageHeader from './AdminDatabasesPageHeader';
import DatabaseDataCard from '../../components/DatabaseDataCard';
import DataCardGrid from '../../components/shared/DataCardGrid';
import { getConnectionsCount, searchConnections } from '../../store/connection/actions';
import { getConnections } from '../../store/connection/selectors';
import NoResult from '../../components/shared/NoResult';
import NewDBConnectionPopup from '../../components/newDBConnectionPopup';

const DatabasesAdmin = ({ connections, fetchConnectionsCount, fetchConnections }) => {
  useEffect(() => {
    fetchConnectionsCount();
    fetchConnections();
  }, []);
  return (
    <div>
      <AdminDatabasesPageHeader />
      <Route path="/admin/databases/create" component={NewDBConnectionPopup} />
      {connections && connections.length ? (
        <DataCardGrid>
          {connections.map((connection) => (
            <DatabaseDataCard {...connection} key={connection.id} />
          ))}
        </DataCardGrid>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

DatabasesAdmin.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      db_name: PropTypes.string,
      connection_name: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
      host: PropTypes.string,
      port: PropTypes.string,
    }),
  ).isRequired,
  fetchConnectionsCount: PropTypes.func.isRequired,
  fetchConnections: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  connections: getConnections,
});

const mapDispatchToPros = (dispatch) => ({
  fetchConnectionsCount: () => {
    dispatch(getConnectionsCount());
  },
  fetchConnections: () => {
    dispatch(searchConnections());
  },
});

export default connect(mapStateToProps, mapDispatchToPros)(DatabasesAdmin);
