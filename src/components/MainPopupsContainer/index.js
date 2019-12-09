import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PopupTypes from '../../store/popups/popupTypes';
import ErrorPopup from '../shared/ErrorPopup';
import InformationPopup from '../shared/InformationPopup';
import { closePopup } from '../../store/popups/actions';
import { getCurrentPopupText, getCurrentPopupType } from '../../store/popups/selectors';
import {
  CreateModelCancelPopup,
  CreateModelSuccessPopup,
  CreateModelErrorPopup,
} from '../CreateModelPopups';

const MainPopupsContainer = ({ closePopup, text, currentPopup }) => {
  switch (currentPopup) {
    case PopupTypes.ERROR:
      return <ErrorPopup onClose={closePopup} text={text} isVisible />;
    case PopupTypes.INFO:
      return <InformationPopup onClose={closePopup} text={text} isVisible />;
    case PopupTypes.CREATE_MODEL_CANCEL_CONFIRM:
      return <CreateModelCancelPopup />;
    case PopupTypes.CREATE_MODEL_SUCCESS:
      return <CreateModelSuccessPopup />;
    case PopupTypes.CREATE_MODEL_ERROR:
      return <CreateModelErrorPopup />;
    default:
      return null;
  }
};

MainPopupsContainer.propTypes = {
  closePopup: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  currentPopup: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentPopup: getCurrentPopupType,
  text: getCurrentPopupText,
});

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPopupsContainer);
