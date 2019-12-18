import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminUsersPageHeader from './AdminUsersPageHeader';
import UsersTable from './components/UsersTable/UsersTable';
import { getUsersCount, searchUsers } from '../../store/adminUsers/actions';
import NewUserPopup from '../../components/User/newUserPopup';

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
      <AdminUsersPageHeader />
      <Route path="/admin/users/create" component={NewUserPopup} />
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
