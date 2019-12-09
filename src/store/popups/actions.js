import { createAction } from 'redux-actions';
import {
  DISPLAY_CONFIRM_POPUP,
  DISPLAY_ERROR_POPUP,
  DISPLAY_INFO_POPUP,
  CLOSE_POPUP,
  DISPLAY_CUSTOM_POPUP,
} from './types';

export const displayConfirmationPopup = createAction(
  DISPLAY_CONFIRM_POPUP,
  ({ onClose, onSubmit, text }) => ({ onClose, onSubmit, text }),
);
export const displayInfoPopup = createAction(DISPLAY_INFO_POPUP, (onClose, text) => ({
  text,
  onClose,
}));
export const displayErrorPopup = createAction(DISPLAY_ERROR_POPUP, (onClose, text) => ({
  text,
  onClose,
}));

export const displayCustomPopup = createAction(DISPLAY_CUSTOM_POPUP, (type) => type);

export const closePopup = createAction(CLOSE_POPUP);
