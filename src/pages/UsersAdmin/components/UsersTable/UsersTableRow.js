import React, { useMemo } from 'react';
import styles from './usersTable.module.scss';
import classNames from 'classnames';
import { DateTime } from 'luxon';

const UsersTableCell = ({ content, className }) => {
  return (
    <td className={classNames(styles.usersCell, className)}>
      {content}
    </td>
  )
};

const UsersTableEditButtons = ({  }) => {
  return (
    <div className={styles.usersCellButtons}>
      <button>
        <img src="/images/usersAdmin/edit-user@1X.png" alt=""/>
      </button>
      <button>
        <img src="/images/usersAdmin/delete-user@1X.png" alt=""/>
      </button>
    </div>
  )
};

const UsersTableRow = ({id, username, description, created_at: createdAt}) => {
  const parsedTime = useMemo(() => {
    const date = DateTime.fromISO(createdAt);
    return (
      <>
        {
          date.toFormat('dd/MM/yyyy')
        }
        <br/>
        <br/>
        {
          date.toFormat('HH:mm')
        }
      </>
    )
  }, [createdAt]);

  return (
    <tr>
      <UsersTableCell content={id} className={styles.usersCellIds} />
      <UsersTableCell content={username} />
      <UsersTableCell content={description} />
      <UsersTableCell content={parsedTime} />
      <UsersTableCell content={<UsersTableEditButtons />} className={styles.usersCellEdit} />
    </tr>
  )
};

export default UsersTableRow;