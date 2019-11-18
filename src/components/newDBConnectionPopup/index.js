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
import {
  getType,
  getUsername,
  getPassword,
  getHost,
  getPort,
  getNameDB,
  getNameConnection,
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
  getNameConnectionValue,
} from '../../store/connection/actions';
import { getErrorMessage } from '../../store/login/selectors';
import PopupButtons from '../shared/BasePopup/components/PopupButtons';
import AlertMessage from '../shared/AlertMessage';

const newConnection = ({
  host,
  port,
  nameDB,
  username,
  password,
  type,
  nameConnection,
  isCreatingInProgress,
  isVisible,
  submitForm,
  isError,
  errorMessage,
  okButton,
  cancelButton,
  onClose,
  changeUsername,
  changePassword,
  changeHost,
  changeType,
  changePort,
  changeNameConnection,
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
                <label className="label" htmlFor="hostField">HOST</label>
                <Input id="hostField" type="text" name="Host" onChange={changeHost} value={host} />
                <label className="label" htmlFor="portField">PORT</label>
                <Input id="portField" type="text" name="Port" onChange={changePort} value={port} />
                <label className="label" htmlFor="nameDBField">DATABASE NAME</label>
                <Input id="nameDBField" type="text" name="nameDB" onChange={changeNameDB} value={nameDB} />
                <label className="label" htmlFor="nameConnectionField">CONNECTION NAME</label>
                <Input id="nameConnectionField" type="text" name="nameConnection" onChange={changeNameConnection} value={nameConnection} />
                <label className="label" htmlFor="usernameField">USERNAME</label>
                <Input id="usernameField" type="text" name="Username" onChange={changeUsername} value={username} />
                <label className="label" htmlFor="passwordField">PASSWORD</label>
                <Input id="passwordField" type="password" name="password" onChange={changePassword} value={password} />
                <label className="label" htmlFor="typeField">TYPE</label>
                <select id="typeField" value={type} onChange={changeType}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <AlertMessage message={errorMessage} classes={alertClasses}>
                <img src="/images/report.png" alt="error message" />
              </AlertMessage>
              <div className={styles.buttons}>
                <PopupButtons
                  okButton={okButton}
                  cancelButton={cancelButton}
                  onSubmit={submitForm}
                  onClose={onClose}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

newConnection.defaultProps = {
  okButton: true,
  cancelButton: true,
  onClose: () => {},
  errorMessage: '',
};

newConnection.propTypes = {
  host: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
  nameDB: PropTypes.string.isRequired,
  nameConnection: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isCreatingInProgress: PropTypes.bool.isRequired,
  isError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  changePassword: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changeHost: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
  changePort: PropTypes.func.isRequired,
  changeNameDB: PropTypes.func.isRequired,
  changeNameConnection: PropTypes.func.isRequired,
  okButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  username: getUsername(state),
  password: getPassword(state),
  host: getHost(state),
  port: getPort(state),
  nameDB: getNameDB(state),
  nameConnection: getNameConnection(state),
  type: getType(state),
  isError: isError(state),
  errorMessage: getErrorMessage(state),
});
const mapDispatchToProps = (dispatch) => ({
  changeHost: (value) => { dispatch(getHostValue(value)); },
  changePort: (value) => { dispatch(getPortValue(value)); },
  changeNameDB: (value) => { dispatch(getNameDBValue(value)); },
  changeNameConnection: (value) => { dispatch(getNameConnectionValue(value)); },
  changePassword: (value) => { dispatch(getPasswordValue(value)); },
  changeUsername: (value) => { dispatch(getUsernameValue(value)); },
  changeType: (value) => { dispatch(getTypeValue(value)); },
  submitForm: () => { dispatch(newConnectionAction()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(newConnection);
