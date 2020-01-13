import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import styles from '../../User/newUserPopup/newUserPopup.module.scss';
import Input from '../../shared/Input';
import AlertMessage from '../../shared/AlertMessage';
import Caption from '../../shared/Caption';
import Select from '../../shared/Select';
import {
  changeNewDescriptionValue,
  changeNewUsernameValue,
  changeNewUserTypeValue
} from '../../../store/createUser/actions';
import {
  getNewDescription,
  getNewUsername,
  getNewUserType,
  getErrorMessage,
  isError,
} from '../../../store/createUser/selectors';

const options = [
  { name: 'admin', value: '1' },
  { name: 'user', value: '2' },
];

const EditUserForm = ({
  newUsername,
  newUserType,
  newDescription,
  changeNewUsername,
  changeNewUserType,
  changeNewDescription,
  errorMessage,
  isError,
}) => {
  const alertClasses = useMemo(() => [
    isError ? styles.visible : styles.hidden,
  ], [isError]);
  return (
    <div className={styles.maxWidth}>
      <Caption classes={styles.newUserCaption}> Edit User </Caption>
      <form>
        <div className={styles.inputFields}>
          <label className={styles.label} htmlFor="username">NEW USERNAME</label>
          <Input id="username" type="text" name="username" onChange={changeNewUsername} value={newUsername} />
        </div>
        <div className={styles.inputFields}>
          <label className={styles.label} htmlFor="newUserType">NEW USER TYPE</label>
          <Select
            options={options}
            classes={styles.select}
            value={newUserType}
            onChange={changeNewUserType}
          />
        </div>
        <div className={styles.inputFields}>
          <label className={styles.label} htmlFor="newDescription">NEW DESCRIPTION</label>
          <Input id="newDescription" type="text" name="newDescription" onChange={changeNewDescription} value={newDescription} />
        </div>
        <AlertMessage message={errorMessage} classes={alertClasses}>
          <img src="/images/report.png" alt="error message" />
        </AlertMessage>
      </form>
    </div>
  );
};

EditUserForm.defaultProps = {
  errorMessage: '',
  newUsername: '',
  newUserType: '',
  newDescription: '',
};

EditUserForm.propTypes = {
  newUsername: PropTypes.string,
  newUserType: PropTypes.string,
  newDescription: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  changeNewUsername: PropTypes.func.isRequired,
  changeNewUserType: PropTypes.func.isRequired,
  changeNewDescription: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  newUsername: getNewUsername,
  newUserType: getNewUserType,
  newDescription: getNewDescription,
  isError,
  options: () => options,
  errorMessage: getErrorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  changeNewUsername: (value) => { dispatch(changeNewUsernameValue(value)); },
  changeNewUserType: (value) => { dispatch(changeNewUserTypeValue(value)); },
  changeNewDescription: (value) => { dispatch(changeNewDescriptionValue(value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
