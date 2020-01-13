import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmPopup from '../shared/ConfirmPopup';
import { closePopup } from '../../store/popups/actions';
import { deleteDashboard } from '../../store/dashboard/actions';

const message = 'You will delete dashboard and its reports. Are you sure?';

const DeleteDashboardConfirmPopup = ({ submit, closePopup }) => (
  <ConfirmPopup onSubmit={submit} onClose={closePopup} text={message} isVisible />
);

DeleteDashboardConfirmPopup.propTypes = {
  submit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  submit: () => {
    dispatch(deleteDashboard());
  },
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(DeleteDashboardConfirmPopup);
