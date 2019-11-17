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
  getType,
  getUsername,
  getPassword,
  getHost,
  getPort,
  getNameDB,
  isError
} from '../../store/connection/selectors';
import {
  newConnectionAction,
  getHostValue,
  getPortValue,
  getPasswordValue,
  getUsernameValue,
  getNameDBValue,
  getTypeValue,
} from '../../store/connection/actions';
import { getErrorMessage } from '../../store/login/selectors';
import PopupButtons from '../shared/BasePopup/components/PopupButtons';

const newConnection = ({
  host,
  port,
  nameDB,
  username,
  password,
  type,
  isCreatingInProgress,
  isVisible,
  submitForm,
  isError,
  okButton,
  cancelButton,
  onClose,
  changeUsername,
  changePassword,
  changeHost,
  changeType,
  changePort,
  changeNameDB,
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
                <Input type="text" name="Host" onChange={changeHost} value={host} />
                <Input text="Port" type="text" name="Port" onChange={changePort} value={port} />
                <Input text="DB" type="text" name="nameDB" onChange={changeNameDB} value={nameDB}>
                  <img src="/images/padlock.png" alt="password icon" />
                </Input>
                <Input text="Username" type="text" name="Username" onChange={changeUsername} value={username}>
                  <img src="/images/user.png" alt="user icon" />
                </Input>
                <Input text="Password" type="password" name="password" onChange={changePassword} value={password}>
                  <img src="/images/padlock.png" alt="password icon" />
                </Input>
                <select value={type} onChange={changeType}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
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

newConnection.defaultProps = {
  okButton: true,
  cancelButton: true,
  onClose: () => {}
};

newConnection.propTypes = {
  host: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
  nameDB: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isCreatingInProgress: PropTypes.bool.isRequired,
  isError: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changeHost: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
  changePort: PropTypes.func.isRequired,
  changeNameDB: PropTypes.func.isRequired,
  okButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  username: getUsername(state),
  password: getPassword(state),
  host: getHost(state),
  port: getPort(state),
  nameDB: getNameDB(state),
  type: getType(state),
  isError: isError(state),
  errorMessage: getErrorMessage(state),
});
const mapDispatchToProps = (dispatch) => ({
  changeHost: (value) => { dispatch(getHostValue(value)); },
  changePort: (value) => { dispatch(getPortValue(value)); },
  changeNameDB: (value) => { dispatch(getNameDBValue(value)); },
  changePassword: (value) => { dispatch(getPasswordValue(value)); },
  changeUsername: (value) => { dispatch(getUsernameValue(value)); },
  changeType: (value) => { dispatch(getTypeValue(value)); },
  submitForm: () => { dispatch(newConnectionAction()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(newConnection);
