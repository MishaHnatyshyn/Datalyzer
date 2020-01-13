import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { preventDefaultHandler } from '../../utils';
import BasePopup from '../shared/BasePopup';
import styles from '../User/newUserPopup/newUserPopup.module.scss';
import { renameModel, onClose } from '../../store/model/actions';
import RenameModelForm from './RenameModelForm';

const RenameModelPopup = ({
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
      body={<RenameModelForm />}
    />
  );
};

RenameModelPopup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: () => { dispatch(renameModel()); },
  onClose: () => { dispatch(onClose()); }
});

export default connect(null, mapDispatchToProps)(RenameModelPopup);
