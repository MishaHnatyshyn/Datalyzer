import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmPopup from '../shared/ConfirmPopup';
import { closePopup } from '../../store/popups/actions';
import { deleteConnection } from '../../store/connection/actions';

const message = 'You will delete this connection. Are you sure?';

const ConnectionDeletePopup = ({ submit, closePopup }) => (
  <ConfirmPopup onSubmit={submit} onClose={closePopup} text={message} isVisible />
);

ConnectionDeletePopup.propTypes = {
  submit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  submit: () => {
    dispatch(closePopup());
    dispatch(deleteConnection());
  },
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(ConnectionDeletePopup);
