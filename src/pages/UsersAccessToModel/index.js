import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './usersAccessToModel.module.scss';
import { searchUsers } from '../../store/adminUsers/actions';
import UsersTable from '../UsersAdmin/components/UsersTable/UsersTable';
import PopupButton from '../../components/shared/BasePopup/components/PopupButton';
import { deselectAllUserWithAccess } from '../../store/createModel/actions';

const UsersAccessToModel = ({ fetchUsers, deselectAllUserWithAccess }) => {
  const fetchUsersData = useMemo(
    () => async () => {
      fetchUsers();
    },
    [],
  );

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <div>
      <div className={styles.buttons}>
        <PopupButton text="Select all" onClick={() => {}} type="ok" classes={styles.button} />
        <PopupButton text="Deselect all" onClick={deselectAllUserWithAccess} type="ok" classes={styles.button} />
      </div>
      <UsersTable selectUser />
    </div>
  );
};

const mapDispatchToPros = (dispatch) => ({
  fetchUsers: () => dispatch(searchUsers()),
  deselectAllUserWithAccess: () => dispatch(deselectAllUserWithAccess())
});

UsersAccessToModel.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  deselectAllUserWithAccess: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToPros)(UsersAccessToModel);
