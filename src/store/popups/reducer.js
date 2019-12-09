import {
  DISPLAY_CONFIRM_POPUP,
  DISPLAY_ERROR_POPUP,
  DISPLAY_INFO_POPUP,
  CLOSE_POPUP,
  DISPLAY_CUSTOM_POPUP,
} from './types';
import PopupTypes from './popupTypes';

const initialState = {
  currentPopup: null,
  onClose: null,
  onSubmit: null,
  text: '',
};

export default function popupsReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_INFO_POPUP:
      return {
        currentPopup: PopupTypes.INFO,
        onClose: action.payload,
        onSubmit: action.payload,
        text: action.payload.text,
      };
    case DISPLAY_ERROR_POPUP:
      return {
        currentPopup: PopupTypes.ERROR,
        onClose: action.payload,
        onSubmit: action.payload,
        text: action.payload.text,
      };
    case DISPLAY_CONFIRM_POPUP:
      return {
        currentPopup: PopupTypes.CONFIRM,
        onClose: action.payload.onClose,
        onSubmit: action.payload.onSubmit,
        text: action.payload.text,
      };
    case DISPLAY_CUSTOM_POPUP:
      return {
        currentPopup: action.payload,
      };
    case CLOSE_POPUP:
      return initialState;
    default:
      return state;
  }
}
