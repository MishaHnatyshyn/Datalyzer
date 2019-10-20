import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './loginForm.module.scss';
import LoginCaption from './LoginCaption';
import LoginButton from './LoginButton';
import Input from '../../shared/Input';
import { getPassword, getUsername } from '../../../store/Login/selectors';
import { changePasswordValue, changeUsernameValue, formSubmit } from '../../../store/Login/actions';
import AlertMessage from '../../shared/AlertMessage';
import { preventDefaultHandler } from '../../../utils';

const ERROR_MESSAGE = 'Wrong username or password. Please, try again';

const LoginForm = ({
  username, password, changePassword, changeUsername, submitForm
}) => {
  const formHandler = useMemo(
    () => preventDefaultHandler(submitForm),
    [submitForm]
  );
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

        <AlertMessage message={ERROR_MESSAGE} classes={styles.error}>
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
};

const mapStateToProps = (state) => ({
  username: getUsername(state),
  password: getPassword(state)
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (value) => { dispatch(changePasswordValue(value)); },
  changeUsername: (value) => { dispatch(changeUsernameValue(value)); },
  submitForm: () => { dispatch(formSubmit()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
