import { compose, prop } from 'lodash/fp';

const root = (state) => state.popups;

export const getCurrentPopupType = compose(prop('currentPopup'), root);
export const getCurrentPopupText = compose(prop('text'), root);
