import React from 'react';
import PropTypes from 'prop-types';
import BasePopup from '../BasePopup';

const ConfirmPopup = ({
  onClose, onSubmit, text, isVisible
}) => (
  <BasePopup
    onClose={onClose}
    onSubmit={onSubmit}
    okButton
    okButtonType="submit"
    image={<img src="/images/Popup/confirmPopupimage.svg" alt="" />}
    text={text}
    isVisible={isVisible}
  />
);

ConfirmPopup.propTypes = {
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmPopup;
