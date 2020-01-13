import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import {
  SET_CONNECTIONS,
  CREATE_FAILURE,
  CREATE_START,
  CREATE_SUCCESS,
  HOST_VALUE,
  PORT_VALUE,
  NAME_DB_VALUE,
  USERNAME_VALUE,
  PASSWORD_VALUE,
  TYPE_VALUE,
  NAME_CONNECTION_VALUE,
  EMPTY_FIELDS_ERROR,
  APPEND_CONNECTIONS,
  ONCLOSE_ACTION,
  CONNECTION_FOR_EDITING,
  EDIT_SUCCESS,
  SHOW_EDIT,
} from './types';
import { post, put } from '../../utils/http';
import { ADMIN_CONNECTIONS_CREATE_ENDPOINT } from '../../config';
import { createConnectionEditRoute } from '../../utils/routeCreators';
import { closePopup, displayCustomPopup } from '../popups/actions';
import PopupTypes from '../popups/popupTypes';
import { getConnectionForEditing } from './selectors';

export const appendConnections = createAction(APPEND_CONNECTIONS, (connections) => connections);
export const createConnectionFailure = createAction(CREATE_FAILURE);
export const createConnectionStart = createAction(CREATE_START);
export const createConnectionSuccess = createAction(CREATE_SUCCESS, (connection) => connection);
export const setConnections = createAction(SET_CONNECTIONS, (connections) => connections);
export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);

export const changeHostValue = createAction(HOST_VALUE, (connection) => connection);
export const changePortValue = createAction(PORT_VALUE, (connection) => connection);
export const changeNameDBValue = createAction(NAME_DB_VALUE, (connection) => connection);
export const changeNameConnectionValue = createAction(
  NAME_CONNECTION_VALUE,
  (connection) => connection,
);
export const changeUsernameValue = createAction(USERNAME_VALUE, (connection) => connection);
export const changePasswordValue = createAction(PASSWORD_VALUE, (connection) => connection);
export const changeTypeValue = createAction(TYPE_VALUE, (connection) => connection.target.value);
export const onClose = createAction(ONCLOSE_ACTION);

export const setConnectionForEditing = createAction(CONNECTION_FOR_EDITING, (value) => value);
export const editConnectionFailure = createAction(CREATE_FAILURE);
export const editConnectionSuccess = createAction(EDIT_SUCCESS, (connection) => connection);
export const showEdit = createAction(SHOW_EDIT);

export const onCloseAction = () => async (dispatch) => {
  dispatch(push('/admin/databases'));
  dispatch(onClose());
};
export const onCloseEdit = () => async (dispatch) => {
  dispatch(closePopup());
  dispatch(onClose());
};
export const showEditPopup = () => async (dispatch) => {
  dispatch(displayCustomPopup(PopupTypes.EDIT_CONNECTION));
  dispatch(showEdit());
};
export const newConnectionAction = () => async (dispatch, getState) => {
  const {
    connectionForms: {
      host, port, nameDB, username: name, password, type, nameConnection
    },
  } = getState();
  if (!name || !password || !host || !port || !nameDB || !type || !nameConnection) {
    return dispatch(emptyFieldsError());
  }
  dispatch(createConnectionStart());
  try {
    const data = await post(ADMIN_CONNECTIONS_CREATE_ENDPOINT, {
      data: {
        host,
        port,
        name: nameConnection,
        databaseName: nameDB,
        username: name,
        password,
        typeId: Number(type),
      },
    });
    dispatch(createConnectionSuccess(data));
    dispatch(push('/admin/databases'));
  } catch (e) {
    console.log(e);
    dispatch(createConnectionFailure());
  }
};
export const editConnectionAction = () => async (dispatch, getState) => {
  const {
    connectionForms: {
      host, port, nameDB, username: name, password, nameConnection
    },
  } = getState();
  if (!name || !password || !host || !port || !nameDB || !nameConnection) {
    return dispatch(emptyFieldsError());
  }
  const connection = getConnectionForEditing(getState());
  try {
    const data = await put(createConnectionEditRoute(connection.id), {
      data: {
        host,
        port,
        name: nameConnection,
        databaseName: nameDB,
        username: name,
        password,
      },
    });
    dispatch(editConnectionSuccess(data));
    dispatch(onCloseEdit());
    dispatch(displayCustomPopup(PopupTypes.EDIT_CONNECTION_SUCCESS));
  } catch (e) {
    console.log(e);
    dispatch(editConnectionFailure());
    dispatch(onCloseEdit());
    dispatch(displayCustomPopup(PopupTypes.EDIT_CONNECTION_FAILURE));
  }
};
