import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { preventDefaultHandler } from '../../utils';
import BasePopup from '../shared/BasePopup';
import styles from '../User/newUserPopup/newUserPopup.module.scss';
import EditUserForm from './EditUserForm';
import { editUser, onCloseEdit } from '../../store/createUser/actions';

const EditUserPopup = ({
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
      body={<EditUserForm />}
    />
  );
};

EditUserPopup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: () => { dispatch(editUser()); },
  onClose: () => { dispatch(onCloseEdit()); }
});

export default connect(null, mapDispatchToProps)(EditUserPopup);
