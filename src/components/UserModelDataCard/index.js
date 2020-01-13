import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import DataCard from '../shared/DataCard';
import AdminCardDataItem from '../shared/AdminCardDataItem';

const UserModelDataCard = ({
  name, tables, columns, created, openCreateReport
}) => {
  const formattedCreationDate = useMemo(() => new Date(created).toLocaleDateString(), [created]);
  return (
    <DataCard
      caption={name}
      secondIcon="/images/plusModel.png"
      thirdIcon=""
      onSecondButtonClick={openCreateReport}
      onThirdButtonClick={() => {}}
    >
      <AdminCardDataItem name="Tables" value={tables} />
      <AdminCardDataItem name="Columns" value={columns} />
      <AdminCardDataItem name="Created at" value={formattedCreationDate} />
    </DataCard>
  );
};
UserModelDataCard.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openCreateReport: () => dispatch(push('/user/report')),
});

UserModelDataCard.propTypes = {
  name: PropTypes.string.isRequired,
  tables: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  columns: PropTypes.string.isRequired,
  openCreateReport: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(UserModelDataCard);
