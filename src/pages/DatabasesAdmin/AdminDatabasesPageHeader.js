import React from 'react';
import { connect } from 'react-redux';
import AdminPageHeader from '../../components/shared/AdminPageHeader';
import { getConnectionsCountData, getSearchInputText } from '../../store/connection/selectors';
import { changeSearchInput, searchConnections } from '../../store/connection/actions';

const mapStateToProps = (state) => ({
  searchValue: getSearchInputText(state),
  countData: getConnectionsCountData(state),
});

const mapDispatchToProps = (dispatch) => ({
  search: (e) => {
    dispatch(changeSearchInput(e.target.value));
  },
  submitForm: () => {
    dispatch(searchConnections());
  },
});

const AdminDatabasesPageHeader = (props) => (
  <AdminPageHeader
    {...props}
    buttonText="New connection"
    pageName="Total connections"
    placeholder="search by name..."
    link="/admin/databases/create"
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDatabasesPageHeader);
