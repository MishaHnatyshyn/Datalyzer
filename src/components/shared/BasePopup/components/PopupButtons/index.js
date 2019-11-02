import React from 'react';
import PropTypes from 'prop-types';
import PopupButton from '../PopupButton';

const PopupButtons = ({
  okButton, cancelButton, onClose, onSubmit, okButtonType
}) => (
  <>
    {
      cancelButton ? <PopupButton onClick={onClose} text="Cancel" type="cancel" /> : null
    }
    {
      okButton ? <PopupButton onClick={onSubmit} text="Ok" type={okButtonType} /> : null
    }
  </>
);

PopupButtons.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  okButton: PropTypes.bool.isRequired,
  cancelButton: PropTypes.bool.isRequired,
  okButtonType: PropTypes.string.isRequired,
};

export default PopupButtons;
