import React, { useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Input from '../../shared/Input';
import { preventDefaultHandler } from '../../../utils';
import NewUserCaption from './NewUserCaption';
import styles from '../../shared/BasePopup/base.popup.module.scss';
import stylesInput from '../../shared/Input/textField.module.scss';
import '../../shared/BasePopup/styles.scss';
import AlertMessage from '../../shared/AlertMessage';
import PopupButtons from '../../shared/BasePopup/components/PopupButtons';
import Textarea from '../../shared/Textarea';
import {
  getUserType,
  getUsername,
  getPassword,
  getPasswordRepeat,
  getUserDescription,
  getErrorMessage,
  getVisible,
  isError,
} from '../../../store/adminUsers/selectors';
import {
  newUser,
  getUserTypeValue,
  getUsernameValue,
  getPasswordValue,
  getPasswordRepeatValue,
  getUserDescriptionValue,
  onCloseAction,
} from '../../../store/adminUsers/actions';
import {goBack, push} from 'connected-react-router';

const NewUserForm = ({
  formUsername,
  formPassword,
  formPasswordRepeat,
  formUserType,
  formDescription,
  isCreatingInProgress,
  isVisible,
  changePassword,
  changeUsername,
  changePasswordRepeat,
  changeUserType,
  changeUserDescription,
  submitForm,
  errorMessage,
  isError,
  okButton,
  okButtonType,
  cancelButton,
  onClose,
}) => {
  const formHandler = useMemo(
    () => preventDefaultHandler(submitForm),
    [submitForm]
  );
  const alertClassesPassLen = useMemo(() => [
    errorMessage === 'Password must be 6 or mor characters' ? styles.visible : styles.hidden,
  ], [isError]);
  const alertClassesPassRepeat = useMemo(() => [
    errorMessage === 'Passwords are not the same' ? styles.visible : styles.hidden,
  ], [isError]);
  const alertClasses = useMemo(() => [
    isError ? styles.visible : styles.hidden,
  ], [isError]);
  const backgroundHandler = useCallback((e) => (
    e.currentTarget === e.target && onClose()
  ), [onClose]);
  return (
    <CSSTransition
      in={true}
      timeout={300}
      classNames="alert"
      unmountOnExit
    >
      <div className={styles.popupWrapper}>
        <div className={styles.blur} onClick={backgroundHandler} />
        <div className={`${styles.popup}`}>
          <div className={styles.header}>
            <div className={styles.cross} onClick={onClose}>
              <img src="/images/Popup/cross.png" alt="" />
            </div>
          </div>
          <NewUserCaption />
          <div className={styles.body}>
            <div className={styles.line} />
            <form onSubmit={formHandler}>
              <div className={styles.inputFields}>
                <label className="label" htmlFor="formUsername">USERNAME</label>
                <Input id="formUsername" classes={stylesInput.noImage} type="text" name="formUsername" onChange={changeUsername} value={formUsername} />
                <label className="label" htmlFor="formPassword">
                  PASSWORD
                  <AlertMessage classes={alertClassesPassLen}>
                    <img src="/images/report.png" alt="error message" />
                  </AlertMessage>
                </label>
                <Input id="formPassword" classes={stylesInput.noImage} type="password" name="password" onChange={changePassword} value={formPassword} />
                <label className="label" htmlFor="formPasswordRepeat">
                  REPEAT PASSWORD
                  <AlertMessage classes={alertClassesPassRepeat}>
                    <img src="/images/report.png" alt="error message" />
                  </AlertMessage>
                </label>
                <Input id="formPasswordRepeat" classes={stylesInput.noImage} type="password" name="formPasswordRepeat" onChange={changePasswordRepeat} value={formPasswordRepeat} />
                <label className="label" htmlFor="formUserType">USER TYPE</label>
                <select id="formUserType" value={formUserType} onChange={changeUserType}>
                  <option value="">user type</option>
                  <option value="1">admin</option>
                  <option value="2">user</option>
                </select>
                <label className="label" htmlFor="formDescription">DESCRIPTION</label>
                <Textarea id="formDescription" name="formDescription" onChange={changeUserDescription} value={formDescription} />
              </div>
              <AlertMessage message={errorMessage} classes={alertClasses}>
                <img src="/images/report.png" alt="error message" />
              </AlertMessage>
              <PopupButtons
                okButton={okButton}
                cancelButton={cancelButton}
                onClose={onClose}
                okButtonType={okButtonType}
              />
            </form>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

NewUserForm.defaultProps = {
  formDescription: '',
  changeUserDescription: () => {},
  okButton: true,
  okButtonType: 'submit',
  cancelButton: true,
  errorMessage: '',
  onClose: () => {}
};

NewUserForm.propTypes = {
  formUsername: PropTypes.string.isRequired,
  formPassword: PropTypes.string.isRequired,
  formPasswordRepeat: PropTypes.string.isRequired,
  formUserType: PropTypes.number.isRequired,
  formDescription: PropTypes.string,
  onClose: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isCreatingInProgress: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  okButtonType: PropTypes.string,
  changePassword: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changePasswordRepeat: PropTypes.func.isRequired,
  changeUserType: PropTypes.func.isRequired,
  changeUserDescription: PropTypes.func,
  okButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isVisible: getVisible(state),
  formUsername: getUsername(state),
  formPassword: getPassword(state),
  formPasswordRepeat: getPasswordRepeat(state),
  formUserType: getUserType(state),
  formDescription: getUserDescription(state),
  isError: isError(state),
  errorMessage: getErrorMessage(state),
});
const mapDispatchToProps = (dispatch) => ({
  changePassword: (value) => { dispatch(getPasswordValue(value)); },
  changeUsername: (value) => { dispatch(getUsernameValue(value)); },
  changePasswordRepeat: (value) => { dispatch(getPasswordRepeatValue(value)); },
  changeUserType: (value) => { dispatch(getUserTypeValue(value)); },
  changeUserDescription: (value) => { dispatch(getUserDescriptionValue(value)); },
  onClose: () => {
    dispatch(onCloseAction());
    dispatch(push('/admin/users'));
  },
  submitForm: () => { dispatch(newUser()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
