import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AdminModelsPageHeader from './AdminModelsPageHeader';
import DataCardGrid from '../../components/shared/DataCardGrid';
import ModelsDataCard from '../../components/ModelsDataCard';
import { getModelsCount, searchModels } from '../../store/model/actions';
import { getModels } from '../../store/model/selectors';
import NoResult from '../../components/shared/NoResult';

const ModelsAdmin = ({ models, fetchModelsCount, fetchModels }) => {
  useEffect(() => {
    fetchModelsCount();
    fetchModels();
  }, []);
  return (
    <div>
      <AdminModelsPageHeader />
      {models && models.length ? (
        <DataCardGrid>
          {models.map((model) => (
            <ModelsDataCard {...model} key={model.id} />
          ))}
        </DataCardGrid>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

ModelsAdmin.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      connection_name: PropTypes.string,
      users: PropTypes.string,
      tables: PropTypes.string,
      created_at: PropTypes.string,
      rows: PropTypes.string,
      usages: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  fetchModelsCount: PropTypes.func.isRequired,
  fetchModels: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  models: getModels,
});

const mapDispatchToPros = (dispatch) => ({
  fetchModelsCount: () => {
    dispatch(getModelsCount());
  },
  fetchModels: () => {
    dispatch(searchModels());
  },
});

export default connect(mapStateToProps, mapDispatchToPros)(ModelsAdmin);
