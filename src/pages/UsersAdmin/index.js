import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AdminUsersPageHeader from './AdminUsersPageHeader';
import UsersTable from './components/UsersTable/UsersTable';
import { getUsersCount, searchUsers } from '../../store/adminUsers/actions';
import NewUserForm from '../../components/User/newUserPopup';

const UsersAdmin = ({ fetchUsersCount, fetchUsers }) => {
  const fetchUsersData = useMemo(() => async () => {
    await fetchUsersCount();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <div>
      <Route path="/admin/users/create" component={NewUserForm} />
      <AdminUsersPageHeader />
      <UsersTable />
    </div>
  );
};

UsersAdmin.propTypes = {
  fetchUsersCount: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

const mapDispatchToPros = (dispatch) => ({
  fetchUsersCount: () => dispatch(getUsersCount()),
  fetchUsers: () => dispatch(searchUsers()),
});

export default connect(null, mapDispatchToPros)(UsersAdmin);
