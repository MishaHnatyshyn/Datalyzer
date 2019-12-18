import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { preventDefaultHandler } from '../../../utils';
import BasePopup from '../../shared/BasePopup';
import NewUserForm from './NewUserForm';
import { getVisible } from '../../../store/createUser/selectors';
import { newUser, onCloseAction } from '../../../store/createUser/actions';
import styles from './newUserPopup.module.scss';


const NewUserPopup = ({
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
      body={<NewUserForm />}
    />
  );
};

NewUserPopup.defaultProps = {
  onClose: () => {}
};

NewUserPopup.propTypes = {
  onClose: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isVisible: getVisible(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch(onCloseAction());
  },
  submitForm: () => { dispatch(newUser()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUserPopup);
