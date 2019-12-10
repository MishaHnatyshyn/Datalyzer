import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closePopup } from '../../store/popups/actions';
import InformationPopup from '../shared/InformationPopup';

const message = 'User was successfully deleted!';

const DeleteUserSuccessPopup = ({ closePopup }) => (
  <InformationPopup onClose={closePopup} text={message} isVisible />
);

DeleteUserSuccessPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(DeleteUserSuccessPopup);
