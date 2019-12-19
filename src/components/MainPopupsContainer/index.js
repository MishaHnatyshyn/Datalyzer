import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PopupTypes from '../../store/popups/popupTypes';
import ErrorPopup from '../shared/ErrorPopup';
import InformationPopup from '../shared/InformationPopup';
import ConfirmPopup from '../shared/ConfirmPopup';
import { closePopup } from '../../store/popups/actions';
import {
  getCurrentPopupText,
  getCurrentPopupType,
  getOnSubmit
} from '../../store/popups/selectors';
import {
  CreateModelCancelPopup,
  CreateModelSuccessPopup,
  CreateModelErrorPopup,
} from '../CreateModelPopups';
import ConnectionDeletePopup from '../ConnectionPopups/DeletePopup';
import DeleteConnectionSuccessPopup from '../ConnectionPopups/DeleteConnectionSuccessPopup';
import DeleteConnectionErrorPopup from '../ConnectionPopups/DeleteConnectionErrorPopup';
import ModelDeletePopup from '../DeleteModelPopups/DeletePopup';
import DeleteModelSuccessPopup from '../DeleteModelPopups/DeleteModelSuccessPopup';
import DeleteModelErrorPopup from '../DeleteModelPopups/DeleteModelErrorPopup';
import DeleteUserSuccessPopup from '../DeleteUserPopup/DeleteUserSuccessPopup';
import DeleteUserErrorPopup from '../DeleteUserPopup/DeleteUserErrorPopup';
import DeleteUserPopup from '../DeleteUserPopup/DeleteUserPopup';
import ChangePassPopup from '../ChangePassPopup';
import { CHANGE_PASSWORD_SUCCESS_MESSAGE, CHANGE_PASSWORD_FAILURE_MESSAGE } from '../../store/user/constants';

const MainPopupsContainer = ({ closePopup, text, currentPopup, onSubmit }) => {
  switch (currentPopup) {
    case PopupTypes.ERROR:
      return <ErrorPopup onClose={closePopup} text={text} isVisible />;
    case PopupTypes.INFO:
      return <InformationPopup onClose={closePopup} text={text} isVisible />;
    case PopupTypes.CONFIRM:
      return <ConfirmPopup onClose={closePopup} onSubmit={onSubmit} text={text} isVisible />;
    case PopupTypes.CREATE_MODEL_CANCEL_CONFIRM:
      return <CreateModelCancelPopup />;
    case PopupTypes.CREATE_MODEL_SUCCESS:
      return <CreateModelSuccessPopup />;
    case PopupTypes.CREATE_MODEL_ERROR:
      return <CreateModelErrorPopup />;
    case PopupTypes.DELETE_CONNECTION:
      return <ConnectionDeletePopup />;
    case PopupTypes.DELETE_CONNECTION_SUCCESS:
      return <DeleteConnectionSuccessPopup />;
    case PopupTypes.DELETE_CONNECTION_ERROR:
      return <DeleteConnectionErrorPopup />;
    case PopupTypes.DELETE_MODEL:
      return <ModelDeletePopup />;
    case PopupTypes.DELETE_MODEL_SUCCESS:
      return <DeleteModelSuccessPopup />;
    case PopupTypes.DELETE_MODEL_ERROR:
      return <DeleteModelErrorPopup />;
    case PopupTypes.DELETE_USER_SUCCESS:
      return <DeleteUserSuccessPopup />;
    case PopupTypes.DELETE_USER_ERROR:
      return <DeleteUserErrorPopup />;
    case PopupTypes.DELETE_USER:
      return <DeleteUserPopup />;
    case PopupTypes.CHANGE_PASSWORD:
      return <ChangePassPopup />;
    case PopupTypes.CHANGE_PASSWORD_SUCCESS:
      return <InformationPopup onClose={closePopup} text={CHANGE_PASSWORD_SUCCESS_MESSAGE} isVisible />;
    case PopupTypes.CHANGE_PASSWORD_FAILURE:
      return <ErrorPopup onClose={closePopup} text={CHANGE_PASSWORD_FAILURE_MESSAGE} isVisible />;
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
  onSubmit: getOnSubmit,
});

const mapDispatchToProps = (dispatch) => ({
  closePopup: () => {
    dispatch(closePopup());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPopupsContainer);
