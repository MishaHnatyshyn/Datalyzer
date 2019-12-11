import React from 'react';
import { connect } from 'react-redux';
import AdminPageHeader from '../../components/shared/AdminPageHeader';
import { getSearchInputText, getUsersCountData } from '../../store/adminUsers/selectors';
import { changeSearchInput, searchUsers } from '../../store/adminUsers/actions';

const mapStateToProps = (state) => ({
  searchValue: getSearchInputText(state),
  countData: getUsersCountData(state),
});

const mapDispatchToProps = (dispatch) => ({
  search: (e) => {
    dispatch(changeSearchInput(e.target.value));
  },
  submitForm: () => {
    dispatch(searchUsers());
  },
});

const AdminUsersPageHeader = (props) => (
  <AdminPageHeader
    {...props}
    buttonText="Create user"
    pageName="Total users"
    placeholder="search by user..."
    link="/admin/users/create"
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsersPageHeader);
