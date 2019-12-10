import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmPopup from '../shared/ConfirmPopup';
import { closePopup } from '../../store/popups/actions';
import { deleteUser } from '../../store/adminUsers/actions';

const message = 'You will delete this user. Are you sure?';

const UserDeletePopup = ({ submit, closePopup }) => (
  <ConfirmPopup onSubmit={submit} onClose={closePopup} text={message} isVisible />
);

UserDeletePopup.propTypes = {
  submit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  submit: () => {
    dispatch(closePopup());
    dispatch(deleteUser());
  },
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(UserDeletePopup);
