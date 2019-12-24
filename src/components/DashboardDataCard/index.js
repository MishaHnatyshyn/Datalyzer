import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import DataCard from '../shared/DataCard';
import AdminCardDataItem from '../shared/AdminCardDataItem';
import { setDashboardForDelete } from '../../store/dashboard/actions';
import { displayCustomPopup } from '../../store/popups/actions';
import PopupTypes from '../../store/popups/popupTypes';

const DashboardDataCard = ({
  created_at, updated_at, name, openDashboard, id, deleteDashboard
}) => {
  const formattedCreationDate = useMemo(() => new Date(created_at).toLocaleDateString(), [
    created_at,
  ]);
  const formattedCUpdatingDate = useMemo(() => new Date(updated_at).toLocaleDateString(), [
    updated_at,
  ]);
  const onSecondIconClick = useCallback(() => {
    openDashboard(id);
  }, [id, openDashboard]);
  const removeDashboard = useCallback(() => {
    deleteDashboard(id);
  }, [deleteDashboard, id]);
  return (
    <DataCard
      caption={name}
      secondIcon="/images/open.png"
      thirdIcon="/images/cross.png"
      onThirdButtonClick={removeDashboard}
      onSecondButtonClick={onSecondIconClick}
    >
      <AdminCardDataItem name="Created" value={formattedCreationDate} />
      <AdminCardDataItem name="Updated" value={formattedCUpdatingDate} />
    </DataCard>
  );
};
DashboardDataCard.propTypes = {
  name: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  openDashboard: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openDashboard: (id) => dispatch(push(`/user/dashboard/${id}`)),
  deleteDashboard: (id) => {
    dispatch(setDashboardForDelete(id));
    dispatch(displayCustomPopup(PopupTypes.DELETE_DASHBOARD));
  }
});

export default connect(null, mapDispatchToProps)(DashboardDataCard);
