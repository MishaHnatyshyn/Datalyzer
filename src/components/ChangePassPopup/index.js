import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { preventDefaultHandler } from '../../utils';
import BasePopup from '../shared/BasePopup';
import ChangePassForm from './ChangePassForm';
import { changePass, onClose } from '../../store/user/actions';
import styles from '../User/newUserPopup/newUserPopup.module.scss';

const ChangePassPopup = ({
  submitForm, onClose,
}) => {
  const formHandler = useMemo(
    () => preventDefaultHandler(submitForm),
    [submitForm]
  );
  return (
    <BasePopup
      onSubmit={formHandler}
      onClose={onClose}
      isVisible
      popupClassName={styles.newUserPopup}
      okButtonType="submit"
      okButton
      body={<ChangePassForm />}
    />
  );
};

ChangePassPopup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: () => { dispatch(changePass()); },
  onClose: () => { dispatch(onClose()); }
});

export default connect(null, mapDispatchToProps)(ChangePassPopup);
