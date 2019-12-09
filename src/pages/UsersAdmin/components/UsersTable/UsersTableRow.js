import React, { useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import styles from './usersTable.module.scss';

const UsersTableCell = ({ content, className }) => (
  <td className={classNames(styles.usersCell, className)}>
    {content}
  </td>
);

UsersTableCell.propTypes = {
  content: PropTypes.node.isRequired,
  className: PropTypes.string
};

UsersTableCell.defaultProps = {
  className: ''
};

const UsersTableEditButtons = () => (
  <div className={styles.usersCellButtons}>
    <button>
      <img src="/images/usersAdmin/edit-user@1X.png" alt="" />
    </button>
    <button>
      <img src="/images/usersAdmin/delete-user@1X.png" alt="" />
    </button>
  </div>
);

const UsersTableRow = ({
  id, username, description, created_at: createdAt
}) => {
  const parsedTime = useMemo(() => {
    const date = DateTime.fromISO(createdAt);
    return (
      <>
        {
          date.toFormat('dd/MM/yyyy')
        }
        <br />
        <br />
        {
          date.toFormat('HH:mm')
        }
      </>
    );
  }, [createdAt]);

  return (
    <tr>
      <UsersTableCell content={id} className={styles.usersCellIds} />
      <UsersTableCell content={username} />
      <UsersTableCell content={description} />
      <UsersTableCell content={parsedTime} />
      <UsersTableCell content={<UsersTableEditButtons />} className={styles.usersCellEdit} />
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
