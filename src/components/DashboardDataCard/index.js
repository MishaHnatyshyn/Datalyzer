import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataCard from '../shared/DataCard';
import AdminCardDataItem from '../shared/AdminCardDataItem';


const DashboardDataCard = ({ created_at, updated_at, name }) => {
  const formattedCreationDate = useMemo(() => new Date(created_at).toLocaleDateString(), [
    created_at,
  ]);
  const formattedCUpdatingDate = useMemo(() => new Date(updated_at).toLocaleDateString(), [
    updated_at,
  ]);
  //const onDelete = useCallback(() => {
  //  deleteModel(id);
  //}, [id, deleteModel]);
  return (
    <DataCard
      caption={name}
      secondIcon="/images/controls.png"
      thirdIcon="/images/cross.png"
      onSecondButtonClick={() => {}}
      onThirdButtonClick={() => {}}
    >
      <AdminCardDataItem name="Created" value={formattedCreationDate} />
      <AdminCardDataItem name="Updated" value={formattedCUpdatingDate} />
    </DataCard>
  );
};

DashboardDataCard.propTypes = {
  name: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  //updateModel: () => {},
  //deleteModel: (id) => {
  //  dispatch(setModelForDeleting(id));
  //  dispatch(displayCustomPopup(PopupTypes.DELETE_MODEL));
  //},
});

export default connect(null, mapDispatchToProps)(DashboardDataCard);
