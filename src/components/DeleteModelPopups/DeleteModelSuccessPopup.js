import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closePopup } from '../../store/popups/actions';
import InformationPopup from '../shared/InformationPopup';

const message = 'Model was successfully deleted!';

const DeleteModelSuccessPopup = ({ closePopup }) => (
  <InformationPopup onClose={closePopup} text={message} isVisible />
);

DeleteModelSuccessPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(DeleteModelSuccessPopup);
