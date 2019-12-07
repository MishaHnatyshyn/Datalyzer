import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getCurrentPage, getUsers} from "../../../../store/adminUsers/selectors";
import UsersTableRow from './UsersTableRow';
import classNames from 'classnames';
import styles from './usersTable.module.scss';

const UsersTableHeaderCell = ({ content }) => {
  return (
    <th className={classNames(styles.usersCell, styles.usersHeaderCell)}>
      {content}
    </th>
  )
};

const TableButton = ({ onClick, content, visible }) => {
  if (!visible) {
    return null
  }

  return (
    <button className={styles.tableButton}>
      {content}
    </button>
  )
};

const UsersTable = ({ users }) => {

  return (
    <div className={styles.users}>
      <div className={styles.tableWrapper}>
        <table className={styles.usersTable}>
          <tbody>
          <tr>
            <UsersTableHeaderCell content={'№'} />
            <UsersTableHeaderCell content={'Username'} />
            <UsersTableHeaderCell content={'Description'} />
            <UsersTableHeaderCell content={'Created'} />
            <UsersTableHeaderCell content={'Edit'} />
          </tr>
          {
            users.map((user) => {
              return (
                <UsersTableRow {...user} />
              )
            })
          }
          </tbody>
        </table>
      </div>
      <div className={styles.tableButtons}>
        <TableButton content={'up'} visible />
        <TableButton content={'down'} visible />
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
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)