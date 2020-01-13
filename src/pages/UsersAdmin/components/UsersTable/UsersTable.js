import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getCurrentPage,
  getUsers,
  getItemsPerPage,
  hasNextPage,
} from '../../../../store/adminUsers/selectors';
import UsersTableRow from './UsersTableRow';
import styles from './usersTable.module.scss';
import { moveToNextPage, moveToPrevPage } from '../../../../store/adminUsers/actions';
import { toggleUserWithAccess } from '../../../../store/createModel/actions';
import { getUsersWithAccess } from '../../../../store/createModel/selectors';

const UsersTableHeaderCell = ({ content, className }) => (
  <th className={classNames(styles.usersCell, styles.usersHeaderCell, className)}>{content}</th>
);

UsersTableHeaderCell.propTypes = {
  content: PropTypes.node.isRequired,
  className: PropTypes.string
};

UsersTableHeaderCell.defaultProps = {
  className: PropTypes.string
};

const TableButton = ({
  onClick, content, enabled, className
}) => (
  <button
    className={classNames(styles.tableButton, className, {
      [styles.tableButtonDisabled]: !enabled,
    })}
    onClick={onClick}
    disabled={!enabled}
  >
    {content}
  </button>
);

TableButton.defaultProps = {
  className: '',
};

TableButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  className: PropTypes.string
};

const UsersTable = ({
  users,
  hasNextPage,
  moveToPrevPage,
  moveToNextPage,
  currentPage,
  itemsPerPage,
  classes,
  selectUser,
  toggleUser,
  usersWithAccess,
}) => {
  const usersList = useMemo(
    () => users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [currentPage, itemsPerPage, users],
  );

  return (
    <div className={classNames(styles.users, classes)}>
      <div className={styles.tableWrapper}>
        <table className={styles.usersTable}>
          <tbody>
            <tr>
              <UsersTableHeaderCell content="№" className={styles.usersCellIds} />
              <UsersTableHeaderCell content="Username" className={styles.usersCellUsername} />
              <UsersTableHeaderCell content="Description" />
              <UsersTableHeaderCell content="Created" className={styles.usersCellEdit} />
              {!selectUser && (
                <UsersTableHeaderCell content="Edit" className={styles.usersCellEdit} />
              )}
              {selectUser && (
                <UsersTableHeaderCell content="Add access" className={styles.usersCellEdit} />
              )}
            </tr>
            {usersList.map((user) => (
              <UsersTableRow
                {...user}
                selectUser={selectUser}
                toggleUser={toggleUser}
                include={usersWithAccess.includes(user.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {!users.length ? null : (
        <div className={styles.tableButtons}>
          <TableButton
            content={<img src="/images/usersAdmin/up-arrow.png" alt="" />}
            enabled={currentPage !== 1}
            onClick={moveToPrevPage}
          />
          <TableButton
            content={<img src="/images/usersAdmin/up-arrow.png" alt="" />}
            enabled={hasNextPage}
            onClick={moveToNextPage}
            className={styles.tableButtonDown}
          />
        </div>
      )}
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string.isRequired,
      created_by_id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      updated_at: PropTypes.string.isRequired,
      user_type_id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
  hasNextPage: PropTypes.bool.isRequired,
  moveToPrevPage: PropTypes.func.isRequired,
  moveToNextPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  classes: PropTypes.string,
  selectUser: PropTypes.bool,
  toggleUser: PropTypes.func.isRequired,
  usersWithAccess: PropTypes.arrayOf(PropTypes.number).isRequired,
};

UsersTable.defaultProps = {
  users: [],
  classes: '',
  selectUser: false,
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
  currentPage: getCurrentPage(state),
  hasNextPage: hasNextPage(state),
  itemsPerPage: getItemsPerPage(state),
  usersWithAccess: getUsersWithAccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  moveToNextPage: () => {
    dispatch(moveToNextPage());
  },
  moveToPrevPage: () => {
    dispatch(moveToPrevPage());
  },
  toggleUser: (index) => {
    dispatch(toggleUserWithAccess(index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
