import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ConnectionCardGrid from '../ConnectionCardGrid';
import ConnectionCard from '../ConnectionCard';
import { getConnections, getSearchInputText } from '../../../store/connection/selectors';
import { searchConnections, changeSearchInput } from '../../../store/connection/actions';
import { setSelectedConnection } from '../../../store/createModel/actions';
import styles from './connectionCardList.module.scss';
import { getSelectedConnection } from '../../../store/createModel/selectors';
import Search from '../Search';

const ConnectionCardList = ({
  connections,
  fetchConnections,
  setSelectedConnection,
  selectedConnection,
  submitForm,
  search,
  searchValue,
}) => {
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div>
      <div className={styles.searchContainer}>
        <Search
          placeholder="search by connection name..."
          onChange={search}
          value={searchValue}
          submitForm={submitForm}
          classes={styles.search}
        />
      </div>
      <ConnectionCardGrid>
        {connections
          && connections.map((connection) => (
            <ConnectionCard
              name={connection.name}
              onClick={() => setSelectedConnection(connection.id)}
              selected={selectedConnection === connection.id ? styles.selected : ''}
            />
          ))}
      </ConnectionCardGrid>
    </div>
  );
};

ConnectionCardList.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      admin_id: PropTypes.number.isRequired,
      type_id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      db_name: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      port: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedConnection: PropTypes.number.isRequired,
  fetchConnections: PropTypes.func.isRequired,
  setSelectedConnection: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  connections: getConnections,
  searchValue: getSearchInputText,
  selectedConnection: getSelectedConnection,
});

const mapDispatchToProps = (dispatch) => ({
  fetchConnections: () => {
    dispatch(searchConnections());
  },
  setSelectedConnection: (value) => {
    dispatch(setSelectedConnection(value));
  },
  search: (e) => {
    dispatch(changeSearchInput(e.target.value));
  },
  submitForm: () => {
    dispatch(searchConnections());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ConnectionCardList);
