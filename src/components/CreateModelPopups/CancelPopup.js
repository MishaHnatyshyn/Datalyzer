import React from 'react';
import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmPopup from '../shared/ConfirmPopup';
import { closePopup } from '../../store/popups/actions';

const message = 'You will lose all your entered data. Are you sure?';

const CreateModelCancelPopup = ({ submit, closePopup }) => (
  <ConfirmPopup onSubmit={submit} onClose={closePopup} text={message} isVisible />
);

CreateModelCancelPopup.propTypes = {
  submit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  submit: () => {
    dispatch(closePopup());
    dispatch(goBack());
  },
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(CreateModelCancelPopup);
