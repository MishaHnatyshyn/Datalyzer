import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../shared/Input';
import AlertMessage from '../../shared/AlertMessage';
import styles from '../newDBConnectionPopup.module.scss';
import '../../shared/BasePopup/styles.scss';
import NewDBCaption from '../NewDBCaption';
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
}) => {
  const alertClasses = useMemo(() => [
    styles.error,
    isError ? styles.visible : styles.hidden
  ], [isError]);
  return (
    <div>
      <NewDBCaption />
      <form>
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
            <option value="">type</option>
            <option value="1">PostgreSQL</option>
          </select>
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
  changeHost: (value) => { dispatch(changeHostValue(value)); },
  changePort: (value) => { dispatch(changePortValue(value)); },
  changeNameDB: (value) => { dispatch(changeNameDBValue(value)); },
  changeNameConnection: (value) => { dispatch(changeNameConnectionValue(value)); },
  changePassword: (value) => { dispatch(changePasswordValue(value)); },
  changeUsername: (value) => { dispatch(changeUsernameValue(value)); },
  changeType: (value) => { dispatch(changeTypeValue(value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewConnectionForm);
