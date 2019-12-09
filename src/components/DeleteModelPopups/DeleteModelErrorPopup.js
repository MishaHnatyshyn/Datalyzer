import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closePopup } from '../../store/popups/actions';
import ErrorPopup from '../shared/ErrorPopup';

const message = 'Failed to delete model. Check your data and try again.';

const DeleteModelErrorPopup = ({ closePopup }) => (
  <ErrorPopup onClose={closePopup} text={message} isVisible />
);

DeleteModelErrorPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(DeleteModelErrorPopup);
