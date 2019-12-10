import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closePopup } from '../../store/popups/actions';
import InformationPopup from '../shared/InformationPopup';

const message = 'Connection was successfully deleted!';

const DeleteConnectionSuccessPopup = ({ closePopup }) => (
  <InformationPopup onClose={closePopup} text={message} isVisible />
);

DeleteConnectionSuccessPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(DeleteConnectionSuccessPopup);
