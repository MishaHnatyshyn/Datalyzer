import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../newUserPopup.module.scss';
import Input from '../../../shared/Input';
import AlertMessage from '../../../shared/AlertMessage';
import Textarea from '../../../shared/Textarea';
import '../../../shared/BasePopup/styles.scss';
import Caption from '../../../shared/Caption';
import {
  getUserType,
  getUsername,
  getPassword,
  getPasswordRepeat,
  getUserDescription,
  getErrorMessage,
  isError,
} from '../../../../store/createUser/selectors';
import {
  changeUserTypeValue,
  changeUsernameValue,
  changePasswordValue,
  changePasswordRepeatValue,
  changeUserDescriptionValue,
} from '../../../../store/createUser/actions';

const NewUserForm = ({
  formUsername,
  formPassword,
  formPasswordRepeat,
  formUserType,
  formDescription,
  changePassword,
  changeUsername,
  changePasswordRepeat,
  changeUserType,
  changeUserDescription,
  errorMessage,
  isError,
}) => {
  const alertClassesPassLen = useMemo(() => [
    errorMessage === 'Password must be 6 or mor characters' ? styles.visible : styles.hidden,
  ], [isError]);
  const alertClassesPassRepeat = useMemo(() => [
    errorMessage === 'Passwords are not the same' ? styles.visible : styles.hidden,
  ], [isError]);
  const alertClasses = useMemo(() => [
    isError ? styles.visible : styles.hidden,
  ], [isError]);
  return (
    <div className={styles.maxWidth}>
      <Caption classes={styles.newUserCaption}> Add new user </Caption>
      <form>
        <div className={styles.inputFields}>
        <label className={styles.label} htmlFor="formUsername">USERNAME</label>
        <Input id="formUsername" type="text" name="formUsername" onChange={changeUsername} value={formUsername} />
        <label className={styles.label} htmlFor="formPassword">
          PASSWORD
          <AlertMessage classes={alertClassesPassLen}>
            <img src="/images/report.png" alt="error message" />
          </AlertMessage>
        </label>
        <Input id="formPassword" type="password" name="password" onChange={changePassword} value={formPassword} />
        <label className={styles.label} htmlFor="formPasswordRepeat">
          REPEAT PASSWORD
          <AlertMessage classes={alertClassesPassRepeat}>
            <img src="/images/report.png" alt="error message" />
          </AlertMessage>
        </label>
        <Input id="formPasswordRepeat" type="password" name="formPasswordRepeat" onChange={changePasswordRepeat} value={formPasswordRepeat} />
        <label className={styles.label} htmlFor="formUserType">USER TYPE</label>
        <select id="formUserType" className={styles.select} value={formUserType} onChange={changeUserType}>
          <option value="">user type</option>
          <option value="1">admin</option>
          <option value="2">user</option>
        </select>
        <label className={styles.label} htmlFor="formDescription">DESCRIPTION</label>
        <Textarea id="formDescription" name="formDescription" onChange={changeUserDescription} value={formDescription} />
        </div>
      <AlertMessage message={errorMessage} classes={alertClasses}>
        <img src="/images/report.png" alt="error message" />
      </AlertMessage>
    </form>
    </div>
  );
};

NewUserForm.defaultProps = {
  formDescription: '',
  changeUserDescription: () => {},
  errorMessage: '',
};

NewUserForm.propTypes = {
  formUsername: PropTypes.string.isRequired,
  formPassword: PropTypes.string.isRequired,
  formPasswordRepeat: PropTypes.string.isRequired,
  formUserType: PropTypes.string.isRequired,
  formDescription: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  changePassword: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changePasswordRepeat: PropTypes.func.isRequired,
  changeUserType: PropTypes.func.isRequired,
  changeUserDescription: PropTypes.func,
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
  changePassword: (value) => { dispatch(changePasswordValue(value)); },
  changeUsername: (value) => { dispatch(changeUsernameValue(value)); },
  changePasswordRepeat: (value) => { dispatch(changePasswordRepeatValue(value)); },
  changeUserType: (value) => { dispatch(changeUserTypeValue(value)); },
  changeUserDescription: (value) => { dispatch(changeUserDescriptionValue(value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
