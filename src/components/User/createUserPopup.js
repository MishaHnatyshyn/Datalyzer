import React, { useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
// import LoginCaption from './LoginCaption';
// import LoginButton from './LoginButton';
import Input from '../shared/Input';
// import AlertMessage from '../../shared/AlertMessage';
import { preventDefaultHandler } from '../../utils';
// import BasePopup from '../shared/BasePopup';
import styles from '../shared/BasePopup/base.popup.module.scss';
import '../shared/BasePopup/styles.scss';
// import CreateButton from '../shared/CreateButton';
// import Caption from '../shared/Caption';
// import PopupButtons from '../shared/BasePopup/components/PopupButtons';
// import LoginCaption from '../Login/LoginForm/LoginCaption';
// import AlertMessage from '../shared/AlertMessage';
// import LoginButton from '../Login/LoginForm/LoginButton';
import {
  getUserType,
  getUsername,
  getPassword,
  getPasswordRepeat,
  getUserDescription,
  isError
} from '../../store/adminUsers/selectors';
import {
  newUser,
  getUserTypeValue,
  getUsernameValue,
  getPasswordValue,
  getPasswordRepeatValue,
  getUserDescriptionValue
} from '../../store/adminUsers/actions';
import { getErrorMessage } from '../../store/login/selectors';
import PopupButtons from '../shared/BasePopup/components/PopupButtons';

const newUserForm = ({
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
  isError,
  okButton,
  cancelButton,
  onClose,
}) => {
  const formHandler = useMemo(
    () => preventDefaultHandler(submitForm),
    [submitForm]
  );
  const alertClasses = useMemo(() => [
    styles.error,
    isError ? styles.visible : styles.hidden
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
          <div className={styles.body}>
            <div className={styles.line} />
            <form onSubmit={formHandler}>
              <div className={styles.inputFields}>
                <Input text="Username" type="text" name="formUsername" onChange={changeUsername} value={formUsername}>
                  <img src="/images/user.png" alt="user icon" />
                </Input>
                <Input text="Password" type="password" name="password" onChange={changePassword} value={formPassword}>
                  <img src="/images/padlock.png" alt="password icon" />
                </Input>
                <Input text="PasswordRepeat" type="password" name="formPasswordRepeat" onChange={changePasswordRepeat} value={formPasswordRepeat}>
                  <img src="/images/padlock.png" alt="password icon" />
                </Input>
                <select value={formUserType} onChange={changeUserType}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <textarea name="formDescription" onChange={changeUserDescription} value={formDescription}>
                  <img src="/images/user.png" alt="user icon" />
                </textarea>
              </div>
            </form>
            <div className={styles.buttons}>
              <PopupButtons
                okButton={okButton}
                cancelButton={cancelButton}
                onSubmit={submitForm}
                onClose={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

newUserForm.defaultProps = {
  formDescription: '',
  changeUserDescription: () => {},
  okButton: true,
  cancelButton: true,
  onClose: () => {}
};

newUserForm.propTypes = {
  formUsername: PropTypes.string.isRequired,
  formPassword: PropTypes.string.isRequired,
  formPasswordRepeat: PropTypes.string.isRequired,
  formUserType: PropTypes.number.isRequired,
  formDescription: PropTypes.string,
  onClose: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isCreatingInProgress: PropTypes.bool.isRequired,
  isError: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changePasswordRepeat: PropTypes.func.isRequired,
  changeUserType: PropTypes.func.isRequired,
  changeUserDescription: PropTypes.func,
  okButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
};
const mapStateToProps = (state) => ({
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
  submitForm: () => { dispatch(newUser()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(newUserForm);
