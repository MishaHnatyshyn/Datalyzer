import React from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closePopup } from '../../store/popups/actions';
import InformationPopup from '../shared/InformationPopup';
import { createModelsRoute } from '../../utils/routeCreators';

const message = 'Model was successfully created!';

const CreateModelSuccessPopup = ({ closePopup }) => (
  <InformationPopup onClose={closePopup} text={message} isVisible />
);

CreateModelSuccessPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
    dispatch(push(createModelsRoute()));
  },
});

export default connect(null, mapDispatchToProps)(CreateModelSuccessPopup);
