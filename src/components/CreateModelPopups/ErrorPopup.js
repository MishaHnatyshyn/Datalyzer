import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closePopup } from '../../store/popups/actions';
import ErrorPopup from '../shared/ErrorPopup';

const message = 'Failed to create model. Check your data and try again.';

const CreateModelErrorPopup = ({ closePopup }) => (
  <ErrorPopup onClose={closePopup} text={message} isVisible />
);

CreateModelErrorPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(null, mapDispatchToProps)(CreateModelErrorPopup);
