import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { closePopup } from '../../store/popups/actions';
import InformationPopup from '../shared/InformationPopup';

const message = 'Dashboard was successfully deleted!';

const DeleteDashboardSuccessPopup = ({ closePopup }) => (
  <InformationPopup onClose={closePopup} text={message} isVisible />
);

DeleteDashboardSuccessPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
    dispatch(push('/user/home'));
  },
});

export default connect(null, mapDispatchToProps)(DeleteDashboardSuccessPopup);
