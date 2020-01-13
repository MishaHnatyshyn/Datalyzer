import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { preventDefaultHandler } from '../../utils';
import NewConnectionForm from '../newDBConnectionPopup/NewDBConnectionForm';
import {
  editConnectionAction,
  onCloseEdit
} from '../../store/connectionForm/actions';
import styles from '../User/newUserPopup/newUserPopup.module.scss';
import BasePopup from '../shared/BasePopup';

const EditConnection = ({
  isVisible,
  submitForm,
  onClose,
}) => {
  const formHandler = useMemo(
    () => preventDefaultHandler(submitForm),
    [submitForm]
  );
  return (
    <BasePopup
      onSubmit={formHandler}
      onClose={onClose}
      isVisible={isVisible}
      popupClassName={styles.newUserPopup}
      okButtonType="submit"
      okButton
      body={<NewConnectionForm editForm />}
    />
  );
};

EditConnection.defaultProps = {
  onClose: () => {}
};

EditConnection.propTypes = {
  onClose: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onClose: () => { dispatch(onCloseEdit()); },
  submitForm: () => { dispatch(editConnectionAction()); },
});

export default connect(null, mapDispatchToProps)(EditConnection);
