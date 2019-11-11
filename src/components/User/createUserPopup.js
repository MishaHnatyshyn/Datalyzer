import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
// import styles from './loginForm.module.scss';
// import LoginCaption from './LoginCaption';
// import LoginButton from './LoginButton';
import Input from '../shared/Input';
import {
  getPassword, getUsername, getErrorMessage, isError
} from '../../store/login/selectors';
// import { changePasswordValue, changeUsernameValue, login } from '../../../store/login/actions';
// import AlertMessage from '../../shared/AlertMessage';
// import { preventDefaultHandler } from '../../../utils';
// import BasePopup from '../shared/BasePopup';
import CreateButton from '../shared/CreateButton';
import Caption from '../shared/Caption';

const newUserForm = ({
                     formUsername,
                     formPassword,
                     formPasswordRepeat,
                     formDescription,
                     formUserType,
                     changePassword,
                     changeUsername,
                     submitForm,
                     isError,
                     errorMessage,
                   }) => {
  const formHandler = useMemo(
    // () => preventDefaultHandler(submitForm),
    [submitForm]
  );
  // const alertClasses = useMemo(() => [
  //   styles.error,
  //   isError ? styles.visible : styles.hidden
  // ], [isError]);
  
  return (
    <div>
      <Caption />
      <div />
      <form onSubmit={formHandler}>
        <div>
          <Input text="Username" type="text" onChange={changeUsername} value={formUsername}>
          </Input>
          <Input text="Password" type="password" onChange={changePassword} value={formPassword}>
          </Input>
          <Input text="Repeat password" type="password" value={formPasswordRepeat}>
          </Input>
          <Input text="User type" type="password" value={formUserType}>
          </Input>
          <Input text="Description" type="password" value={formDescription}>
          </Input>
        </div>
        <AlertMessage message={errorMessage} classes={alertClasses}>
          <img src="/images/report.png" alt="error message" />
        </AlertMessage>
        <CreateButton />
      </form>
    </div>
  );
};


newUserForm.propTypes = {
  formUsername: PropTypes.string.isRequired,
  formPassword: PropTypes.string.isRequired,
  formPasswordRepeat: PropTypes.string.isRequired,
  formUserType: PropTypes.number.isRequired,
  formDescription: PropTypes.string,
  changePassword: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  formUsername: getUsername(state),
  formPassword: getPassword(state),
  // formPasswordRepeat: getPasswordRepeat(state),
  // formUserType: getUserTypeId(state),
  // formDescription: getDescription(state),
  isError: isError(state),
  errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (value) => { dispatch(changePasswordValue(value)); },
  changeUsername: (value) => { dispatch(changeUsernameValue(value)); },
  submitForm: () => { dispatch(login()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(newUserForm);

