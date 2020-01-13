import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { connect } from 'react-redux';
import styles from './usersTable.module.scss';
import { displayCustomPopup } from '../../../../store/popups/actions';
import PopupTypes from '../../../../store/popups/popupTypes';
import { setUserForDeleting } from '../../../../store/adminUsers/actions';
import Checkbox from '../../../../components/Checkbox';

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

  return (
    <div className={styles.usersCellButtons}>
      <button onClick={updateUser}>
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
  updateUser: () => {},
  deleteUser: (id) => {
    dispatch(setUserForDeleting(id));
    dispatch(displayCustomPopup(PopupTypes.DELETE_USER));
  },
});

const UsersTableEditButtons = connect(null, mapDispatchToProps)(UsersTableEditButtonsComponent);

const UsersTableRow = ({
  id, username, description, created_at: createdAt, selectUser, toggleUser, include
}) => {
  const handleClick = useCallback(() => {
    toggleUser(id);
  }, [id]);

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

      {selectUser && (
        <UsersTableCell
          content={(
            <Checkbox
              classes={styles.checkmark}
              include={include}
              onIncludeChange={handleClick}
            />
          )}
        />
      )}

      {!selectUser && (
        <UsersTableCell
          content={<UsersTableEditButtons id={id} />}
          className={styles.usersCellEdit}
        />
      )}
    </tr>
  );
};

UsersTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  selectUser: PropTypes.bool.isRequired,
  toggleUser: PropTypes.func.isRequired,
  include: PropTypes.bool.isRequired
};

export default UsersTableRow;
