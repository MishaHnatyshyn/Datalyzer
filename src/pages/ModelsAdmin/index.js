import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminModelsPageHeader from './AdminModelsPageHeader';
import DataCardGrid from '../../components/shared/DataCardGrid';
import ModelsDataCard from '../../components/ModelsDataCard';

const models = [
  {
    name: 'name',
    connection_name: 'connection_name',
    users: 'users',
    tables: 'tables',
    created_at: 'created_at',
    rows: 'rows',
    usages: 'usages',
    status: 'active'
  },
  {
    name: 'name',
    connection_name: 'connection_name',
    users: 'users',
    tables: 'tables',
    created_at: 'created_at',
    rows: 'rows',
    usages: 'usages',
    status: 'active'
  },
  {
    name: 'name',
    connection_name: 'connection_name',
    users: 'users',
    tables: 'tables',
    created_at: 'created_at',
    rows: 'rows',
    usages: 'usages',
    status: 'disabled'
  },
];

const ModelsAdmin = ({ models }) => (
  <div>
    <AdminModelsPageHeader />
    <DataCardGrid>
      {models.map((model) => <ModelsDataCard {...model} />)}
    </DataCardGrid>

  </div>
);

ModelsAdmin.propTypes = {
  models: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    connection_name: PropTypes.string,
    users: PropTypes.string,
    tables: PropTypes.string,
    created_at: PropTypes.string,
    rows: PropTypes.string,
    usages: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = () => ({
  models,
});

export default connect(mapStateToProps)(ModelsAdmin);
