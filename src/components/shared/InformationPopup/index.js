import React from 'react';
import PropTypes from 'prop-types';
import BasePopup from '../BasePopup';

const InformationPopup = ({ onClose, text, isVisible }) => (
  <BasePopup
    onClose={onClose}
    onSubmit={onClose}
    okButton
    cancelButton={false}
    image={<img src="/images/Popup/informationPopupImage.svg" alt="" />}
    text={text}
    isVisible={isVisible}
  />
);

InformationPopup.propTypes = {
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InformationPopup;
