import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import styles from './loginForm.module.scss';
import LoginCaption from './LoginCaption';
import LoginButton from './LoginButton';
import Input from '../../shared/Input';
import {
  getPassword, getUsername, getErrorMessage, isError, isLoading
} from '../../../store/login/selectors';
import { changePasswordValue, changeUsernameValue, login } from '../../../store/login/actions';
import AlertMessage from '../../shared/AlertMessage';
import { preventDefaultHandler } from '../../../utils';
import Loader from '../../shared/Loader';

const LoginForm = ({
  username,
  password,
  changePassword,
  changeUsername,
  submitForm,
  isError,
  errorMessage,
  isLoading
}) => {
  const formHandler = useMemo(() => preventDefaultHandler(submitForm), [submitForm]);
  const alertClasses = useMemo(() => [styles.error, isError ? styles.visible : styles.hidden], [
    isError,
  ]);

  return (
    <div className={styles.loginForm}>
      <LoginCaption />
      <div className={styles.line} />
      <form onSubmit={formHandler}>
        <div className={styles.inputFields}>
          <Input text="Username" type="text" withImage onChange={changeUsername} value={username}>
            <img src="/images/user.png" alt="user icon" />
          </Input>
          <Input text="Password" type="password" withImage onChange={changePassword} value={password}>
            <img src="/images/padlock.png" alt="password icon" />
          </Input>
        </div>
        <AlertMessage message={errorMessage} classes={alertClasses}>
          <img src="/images/report.png" alt="error message" />
        </AlertMessage>
        <div className={styles.loginButtonContainer}>
          { isLoading && <Loader classes={styles.spinner} /> }
          <LoginButton />
        </div>
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
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: getUsername,
  password: getPassword,
  isError,
  errorMessage: getErrorMessage,
  isLoading
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (value) => {
    dispatch(changePasswordValue(value));
  },
  changeUsername: (value) => {
    dispatch(changeUsernameValue(value));
  },
  submitForm: () => {
    dispatch(login());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
