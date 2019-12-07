import React from 'react';
import styles from './usersTable.module.scss';

const UsersTableCell = ({ content }) => {
  return (
    <td className={styles.usersCell}>
      {content}
    </td>
  )
};

const UsersTableRow = ({id, username, description, created_at: createdAt}) => {
  return (
    <tr>
      <UsersTableCell content={id} />
      <UsersTableCell content={username} />
      <UsersTableCell content={description} />
      <UsersTableCell content={createdAt} />
      <UsersTableCell content={'buttons'} />
    </tr>
  )
};

export default UsersTableRow;