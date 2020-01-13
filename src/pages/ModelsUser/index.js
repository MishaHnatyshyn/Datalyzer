import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import DataCardGrid from '../../components/shared/DataCardGrid';
import NoResult from '../../components/shared/NoResult';
import ModelsPageHeader from './ModelsUserPageHeader';
import UserModelDataCard from '../../components/UserModelDataCard';
import { getModels } from '../../store/model/selectors';
import { searchModels } from '../../store/model/actions';

const UserModels = ({ models, fetchModels }) => {
  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div>
      <ModelsPageHeader />
      {models && models.length ? (
        <DataCardGrid>
          {models.map((model) => (
            <UserModelDataCard {...model} key={model.id} />
          ))}
        </DataCardGrid>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

UserModels.propTypes = {
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
  fetchModels: () => {
    dispatch(searchModels());
  },
});

export default connect(mapStateToProps, mapDispatchToPros)(UserModels);
