/* eslint-disable import/no-unresolved */
import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './loginForm.module.scss';
import LoginCaption from './LoginCaption';
import LoginButton from './LoginButton';
import Input from '../../shared/Input';
import { getPassword, getUsername } from '../../../store/Login/selectors';
import { changePasswordValue, changeUsernameValue } from '../../../store/Login/actions';
import AlertMessage from '../../shared/AlertMessage';
import { preventDefaultHandler } from '../../../utils';
import { login, redirectToHomeIfIsAuthorized } from '../../../store/login/actions';
import { getErrorMessage, isError } from '../../../store/login/selectors';


const LoginForm = ({
  username,
  password,
  changePassword,
  changeUsername,
  submitForm,
  isError,
  errorMessage,
  redirectToHomeIfIsAuthorized
}) => {
  const formHandler = useMemo(
    () => preventDefaultHandler(submitForm),
    [submitForm]
  );
  const alertClasses = useMemo(() => [
    styles.error,
    isError ? styles.visible : styles.hidden
  ], [isError]);

  useEffect(() => {
    redirectToHomeIfIsAuthorized();
  }, []);

  return (
    <div className={styles.loginForm}>
      <LoginCaption />
      <div className={styles.line} />
      <form onSubmit={formHandler}>
        <div className={styles.inputFields}>
          <Input text="Username" type="text" onChange={changeUsername} value={username}>
            <img src="/images/user.png" alt="user icon" />
          </Input>
          <Input text="Password" type="password" onChange={changePassword} value={password}>
            <img src="/images/padlock.png" alt="password icon" />
          </Input>
        </div>
        <AlertMessage message={errorMessage} classes={alertClasses}>
          <img src="/images/report.png" alt="error message" />
        </AlertMessage>
        <LoginButton />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  redirectToHomeIfIsAuthorized: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: getUsername(state),
  password: getPassword(state),
  isError: isError(state),
  errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (value) => { dispatch(changePasswordValue(value)); },
  changeUsername: (value) => { dispatch(changeUsernameValue(value)); },
  submitForm: () => { dispatch(login()); },
  redirectToHomeIfIsAuthorized: () => { dispatch(redirectToHomeIfIsAuthorized()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
