import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { connect } from 'react-redux';
import styles from './usersTable.module.scss';
import { displayCustomPopup } from '../../../../store/popups/actions';
import PopupTypes from '../../../../store/popups/popupTypes';
import { setUserForDeleting } from '../../../../store/adminUsers/actions';
import { setUserForEditing, showEditPopup } from '../../../../store/createUser/actions';

const UsersTableCell = ({ content, className }) => (
  <td className={classNames(styles.usersCell, className)}>{content}</td>
);

UsersTableCell.propTypes = {
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
};

UsersTableCell.defaultProps = {
  className: '',
};

const UsersTableEditButtonsComponent = ({ id, deleteUser, updateUser }) => {
  const onDelete = useCallback(() => {
    deleteUser(id);
  }, [id, deleteUser]);
  const onUpdate = useCallback(() => {
    updateUser(id);
  }, [id, updateUser]);

  return (
    <div className={styles.usersCellButtons}>
      <button onClick={onUpdate}>
        <img src="/images/usersAdmin/edit-user@1X.png" alt="" />
      </button>
      <button onClick={onDelete}>
        <img src="/images/usersAdmin/delete-user@1X.png" alt="" />
      </button>
    </div>
  );
};

UsersTableEditButtonsComponent.propTypes = {
  id: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (id) => {
    dispatch(setUserForEditing(id));
    dispatch(showEditPopup());
  },
  deleteUser: (id) => {
    dispatch(setUserForDeleting(id));
    dispatch(displayCustomPopup(PopupTypes.DELETE_USER));
  },
});

const UsersTableEditButtons = connect(null, mapDispatchToProps)(UsersTableEditButtonsComponent);

const UsersTableRow = ({
  id, username, description, created_at: createdAt
}) => {
  const parsedTime = useMemo(() => {
    const date = DateTime.fromISO(createdAt);
    return (
      <>
        {date.toFormat('dd/MM/yyyy')}
        <br />
        <br />
        {date.toFormat('HH:mm')}
      </>
    );
  }, [createdAt]);

  return (
    <tr>
      <UsersTableCell content={id} className={styles.usersCellIds} />
      <UsersTableCell content={username} />
      <UsersTableCell content={description} />
      <UsersTableCell content={parsedTime} />
      <UsersTableCell
        content={<UsersTableEditButtons id={id} />}
        className={styles.usersCellEdit}
      />
    </tr>
  );
};

UsersTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default UsersTableRow;
