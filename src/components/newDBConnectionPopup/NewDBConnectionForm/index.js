import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../shared/Input';
import AlertMessage from '../../shared/AlertMessage';
import styles from '../../User/newUserPopup/newUserPopup.module.scss';

import Caption from '../../shared/Caption';
import {
  getType,
  getUsername,
  getPassword,
  getHost,
  getPort,
  getNameDB,
  getNameConnection,
  isError,
  getErrorMessage,
} from '../../../store/connectionForm/selectors';
import {
  changeHostValue,
  changePortValue,
  changePasswordValue,
  changeUsernameValue,
  changeNameDBValue,
  changeTypeValue,
  changeNameConnectionValue,
} from '../../../store/connectionForm/actions';
import Select from '../../shared/Select';

const options = [{ name: 'PostgreSQL', value: '1' }];

const NewConnectionForm = ({
  host,
  port,
  nameDB,
  username,
  password,
  type,
  nameConnection,
  isError,
  errorMessage,
  changeUsername,
  changePassword,
  changeHost,
  changeType,
  changePort,
  changeNameConnection,
  changeNameDB,
  editForm,
}) => {
  const alertClasses = useMemo(() => [
    styles.error,
    isError ? styles.visible : styles.hidden
  ], [isError]);
  return (
    <div>
      <Caption classes={styles.newUserCaption}>{editForm ? 'Edit connection' : 'Add new connection'}</Caption>
      <form>
        <div className={styles.inputFields}>
          <label className={styles.label} htmlFor="hostField">HOST</label>
          <Input id="hostField" type="text" name="Host" onChange={changeHost} value={host} />
          <label className={styles.label} htmlFor="portField">PORT</label>
          <Input id="portField" type="text" name="Port" onChange={changePort} value={port} />
          <label className={styles.label} htmlFor="nameDBField">DATABASE NAME</label>
          <Input id="nameDBField" type="text" name="nameDB" onChange={changeNameDB} value={nameDB} />
          <label className={styles.label} htmlFor="nameConnectionField">CONNECTION NAME</label>
          <Input id="nameConnectionField" type="text" name="nameConnection" onChange={changeNameConnection} value={nameConnection} />
          <label className={styles.label} htmlFor="usernameField">USERNAME</label>
          <Input id="usernameField" type="text" name="Username" onChange={changeUsername} value={username} />
          <label className={styles.label} htmlFor="passwordField">PASSWORD</label>
          <Input id="passwordField" type="password" name="password" onChange={changePassword} value={password} />
          { !editForm && (
            <div>
              <label className={styles.label} htmlFor="typeField">TYPE</label>
              <Select
                options={options}
                classes={styles.select}
                value={type}
                onChange={changeType}
              />
            </div>)}
        </div>
        <AlertMessage message={errorMessage} classes={alertClasses}>
          <img src="/images/report.png" alt="error message" />
        </AlertMessage>
      </form>
    </div>
  );
};

NewConnectionForm.defaultProps = {
  errorMessage: '',
  editForm: false,
};

NewConnectionForm.propTypes = {
  host: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
  nameDB: PropTypes.string.isRequired,
  nameConnection: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  isError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  changePassword: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changeHost: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
  changePort: PropTypes.func.isRequired,
  changeNameDB: PropTypes.func.isRequired,
  changeNameConnection: PropTypes.func.isRequired,
  editForm: PropTypes.bool
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
  options,
});
const mapDispatchToProps = (dispatch) => ({
  changeHost: (value) => { dispatch(changeHostValue(value)); },
  changePort: (value) => { dispatch(changePortValue(value)); },
  changeNameDB: (value) => { dispatch(changeNameDBValue(value)); },
  changeNameConnection: (value) => { dispatch(changeNameConnectionValue(value)); },
  changePassword: (value) => { dispatch(changePasswordValue(value)); },
  changeUsername: (value) => { dispatch(changeUsernameValue(value)); },
  changeType: (value) => { dispatch(changeTypeValue(value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewConnectionForm);
