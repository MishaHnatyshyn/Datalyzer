import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmPopup from '../shared/ConfirmPopup';
import { closePopup } from '../../store/popups/actions';
import { deleteModel } from '../../store/model/actions';

const message = 'You will delete this model. Are you sure?';

const ModelDeletePopup = ({ submit, closePopup }) => (
  <ConfirmPopup onSubmit={submit} onClose={closePopup} text={message} isVisible />
);

ModelDeletePopup.propTypes = {
  submit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  submit: () => {
    dispatch(closePopup());
    dispatch(deleteModel());
  },
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(ModelDeletePopup);
