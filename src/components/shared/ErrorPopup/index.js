import React from 'react';
import PropTypes from 'prop-types';
import BasePopup from '../BasePopup';

const ErrorPopup = ({
  onClose, text, title, isVisible
}) => (
  <BasePopup
    onClose={onClose}
    onSubmit={onClose}
    okButton
    cancelButton={false}
    image={<img src="/images/Popup/errorPopupImage.png" alt="" />}
    text={text}
    title={title}
    isVisible={isVisible}
  />
);

ErrorPopup.propTypes = {
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

ErrorPopup.defaultProps = {
  title: ''
};

export default ErrorPopup;
