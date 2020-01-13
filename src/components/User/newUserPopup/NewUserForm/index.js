import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../newUserPopup.module.scss';
import Input from '../../../shared/Input';
import AlertMessage from '../../../shared/AlertMessage';
import Textarea from '../../../shared/Textarea';
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
import Select from '../../../shared/Select';
import {
  PASS_EQUAL_ERROR_MESSAGE,
  PASS_LENGTH_ERROR_MESSAGE,
} from '../../../../store/createUser/constants';

const options = [
  { name: 'admin', value: '1' },
  { name: 'user', value: '2' },
];

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
  editForm,
}) => {
  const alertClassesPassLen = useMemo(
    () => [errorMessage === PASS_LENGTH_ERROR_MESSAGE ? styles.visible : styles.hidden],
    [isError],
  );
  const alertClassesPassRepeat = useMemo(
    () => [errorMessage === PASS_EQUAL_ERROR_MESSAGE ? styles.visible : styles.hidden],
    [isError],
  );
  const alertClasses = useMemo(() => [isError ? styles.visible : styles.hidden], [isError]);
  return (
    <div className={styles.maxWidth}>
      <Caption classes={styles.newUserCaption}>
        <p>{editForm ? 'Edit user' : 'Add new user'}</p>
      </Caption>
      <form>
        <div className={styles.inputFields}>
          <label className={styles.label} htmlFor="formUsername">
            USERNAME
          </label>
          <Input
            id="formUsername"
            type="text"
            name="formUsername"
            onChange={changeUsername}
            value={formUsername}
          />
          {!editForm && (
            <div>
              <label className={styles.label} htmlFor="formPassword">
              PASSWORD
                <AlertMessage classes={alertClassesPassLen}>
                  <img src="/images/report.png" alt="error message" />
                </AlertMessage>
              </label>
              <Input
                id="formPassword"
                type="password"
                name="password"
                onChange={changePassword}
                value={formPassword}
              />
              <label className={styles.label} htmlFor="formPasswordRepeat">
              REPEAT PASSWORD
                <AlertMessage classes={alertClassesPassRepeat}>
                  <img src="/images/report.png" alt="error message" />
                </AlertMessage>
              </label>
              <Input
                id="formPasswordRepeat"
                type="password"
                name="formPasswordRepeat"
                onChange={changePasswordRepeat}
                value={formPasswordRepeat}
              />
            </div>
          )}
          <label className={styles.label} htmlFor="formUserType">
            USER TYPE
          </label>
          <Select
            options={options}
            classes={styles.select}
            value={formUserType}
            onChange={changeUserType}
          />
          <label className={styles.label} htmlFor="formDescription">
            DESCRIPTION
          </label>
          <Textarea
            id="formDescription"
            name="formDescription"
            onChange={changeUserDescription}
            value={formDescription}
          />
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
  editForm: false,
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
  editForm: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  formUsername: getUsername(state),
  formPassword: getPassword(state),
  formPasswordRepeat: getPasswordRepeat(state),
  formUserType: getUserType(state),
  formDescription: getUserDescription(state),
  isError: isError(state),
  errorMessage: getErrorMessage(state),
  options,
});
const mapDispatchToProps = (dispatch) => ({
  changePassword: (value) => {
    dispatch(changePasswordValue(value));
  },
  changeUsername: (value) => {
    dispatch(changeUsernameValue(value));
  },
  changePasswordRepeat: (value) => {
    dispatch(changePasswordRepeatValue(value));
  },
  changeUserType: (value) => {
    dispatch(changeUserTypeValue(value));
  },
  changeUserDescription: (value) => {
    dispatch(changeUserDescriptionValue(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm);
