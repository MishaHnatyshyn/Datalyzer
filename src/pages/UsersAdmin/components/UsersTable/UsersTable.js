import React, {useMemo}  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {getCurrentPage, getUsers, getItemsPerPage, hasNextPage} from "../../../../store/adminUsers/selectors";
import UsersTableRow from './UsersTableRow';
import styles from './usersTable.module.scss';
import { moveToNextPage, moveToPrevPage } from '../../../../store/adminUsers/actions';

const UsersTableHeaderCell = ({ content, className }) => (
    <th className={classNames(styles.usersCell, styles.usersHeaderCell, className)}>
      {content}
    </th>
  );

const TableButton = ({ onClick, content, visible, className }) => {
  if (!visible) {
    return null
  }

  return (
    <button className={classNames(styles.tableButton, className)} onClick={onClick}>
      {content}
    </button>
  )
};

const UsersTable = ({ users, hasNextPage, moveToPrevPage, moveToNextPage, currentPage, itemsPerPage }) => {

  const usersList = useMemo(() => users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [currentPage, itemsPerPage, users]);

  return (
    <div className={styles.users}>
      <div className={styles.tableWrapper}>
        <table className={styles.usersTable}>
          <tbody>
          <tr>
            <UsersTableHeaderCell content={'№'} className={styles.usersCellIds} />
            <UsersTableHeaderCell content={'Username'} />
            <UsersTableHeaderCell content={'Description'} />
            <UsersTableHeaderCell content={'Created'} />
            <UsersTableHeaderCell content={'Edit'} className={styles.usersCellEdit} />
          </tr>
          {
            usersList.map((user) => (
                <UsersTableRow {...user} />
              ))
          }
          </tbody>
        </table>
      </div>
      <div className={styles.tableButtons}>
        <TableButton
          content={<img src="/images/usersAdmin/up-arrow.png" alt=""/>}
          visible={currentPage !== 1}
          onClick={moveToPrevPage}
        />
        <TableButton
          content={<img src="/images/usersAdmin/up-arrow.png" alt=""/>}
          visible={hasNextPage}
          onClick={moveToNextPage}
          className={styles.tableButtonDown}
        />
      </div>
    </div>
  )
};

UsersTable.proptypes = {
  users: PropTypes.array.isRequired,
};

UsersTable.defaultProps = {
  users: []
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
  currentPage: getCurrentPage(state),
  hasNextPage: hasNextPage(state),
  itemsPerPage: getItemsPerPage(state)
});

const mapDispatchToProps = (dispatch) => ({
  moveToNextPage: () => {dispatch(moveToNextPage())},
  moveToPrevPage: () => {dispatch(moveToPrevPage())},
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)