import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import styles from '../../User/newUserPopup/newUserPopup.module.scss';
import Input from '../../shared/Input';
import AlertMessage from '../../shared/AlertMessage';
import Caption from '../../shared/Caption';
import {
  getOldPassword,
  getPassword,
  getPasswordRepeat,
  getErrorMessage,
  isError,
} from '../../../store/user/selectors';
import {
  changeOldPasswordValue,
  changePasswordValue,
  changePasswordRepeatValue,
} from '../../../store/user/actions';
import {
  PASS_EQUAL_ERROR_MESSAGE,
  PASS_LENGTH_ERROR_MESSAGE
} from '../../../store/createUser/constants';

const NewUserForm = ({
  oldPassword,
  password,
  passwordRepeat,
  changePassword,
  changeOldPassword,
  changePasswordRepeat,
  errorMessage,
  isError,
}) => {
  const alertClassesPassLen = useMemo(() => [
    errorMessage === PASS_LENGTH_ERROR_MESSAGE ? styles.visible : styles.hidden,
  ], [isError]);
  const alertClassesPassRepeat = useMemo(() => [
    errorMessage === PASS_EQUAL_ERROR_MESSAGE ? styles.visible : styles.hidden,
  ], [isError]);
  const alertClasses = useMemo(() => [
    isError ? styles.visible : styles.hidden,
  ], [isError]);
  return (
    <div className={styles.maxWidth}>
      <Caption classes={styles.newUserCaption}> Change password </Caption>
      <form>
        <div className={styles.inputFields}>
          <label className={styles.label} htmlFor="oldPassword">OLD PASSWORD</label>
          <Input id="oldPassword" type="password" name="oldPassword" onChange={changeOldPassword} value={oldPassword} />
          <label className={styles.label} htmlFor="password">
            PASSWORD
            <AlertMessage classes={alertClassesPassLen}>
              <img src="/images/report.png" alt="error message" />
            </AlertMessage>
          </label>
          <Input id="password" type="password" name="password" onChange={changePassword} value={password} />
          <label className={styles.label} htmlFor="formPasswordRepeat">
            REPEAT PASSWORD
            <AlertMessage classes={alertClassesPassRepeat}>
              <img src="/images/report.png" alt="error message" />
            </AlertMessage>
          </label>
          <Input id="passwordRepeat" type="password" name="passwordRepeat" onChange={changePasswordRepeat} value={passwordRepeat} />
        </div>
        <AlertMessage message={errorMessage} classes={alertClasses}>
          <img src="/images/report.png" alt="error message" />
        </AlertMessage>
      </form>
    </div>
  );
};

NewUserForm.defaultProps = {
  errorMessage: '',
};

NewUserForm.propTypes = {
  oldPassword: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  changePassword: PropTypes.func.isRequired,
  changeOldPassword: PropTypes.func.isRequired,
  changePasswordRepeat: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  oldPassword: getOldPassword,
  password: getPassword,
  passwordRepeat: getPasswordRepeat,
  isError,
  errorMessage: getErrorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  changePassword: (value) => { dispatch(changePasswordValue(value)); },
  changeOldPassword: (value) => { dispatch(changeOldPasswordValue(value)); },
  changePasswordRepeat: (value) => { dispatch(changePasswordRepeatValue(value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
