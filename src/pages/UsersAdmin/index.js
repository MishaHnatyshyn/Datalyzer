import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminUsersPageHeader from './AdminUsersPageHeader';
import { getUsersCount, searchUsers } from '../../store/adminUsers/actions';

const UsersAdmin = ({ fetchUsersCount, fetchUsers }) => {
  useEffect(() => {
    fetchUsersCount();
    fetchUsers();
  }, []);
  return (
    <div>
      <AdminUsersPageHeader />
    </div>
  );
};

UsersAdmin.propTypes = {
  fetchUsersCount: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

const mapDispatchToPros = (dispatch) => ({
  fetchUsersCount: () => { dispatch(getUsersCount()); },
  fetchUsers: () => { dispatch(searchUsers()); },
});

export default connect(null, mapDispatchToPros)(UsersAdmin);
