import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import {
  SET_USERS,
  CREATE_FAILURE,
  CREATE_START,
  FORM_USER_TYPE_INPUT_VALUE,
  FORM_DESCRIPTION_INPUT_VALUE,
  FORM_USERNAME_INPUT_VALUE,
  FORM_PASSWORD_INPUT_VALUE,
  FORM_PASSWORD_REPEAT_INPUT_VALUE,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_EQUAL_ERROR,
  EMPTY_FIELDS_ERROR,
  CREATE_SUCCESS,
  ONCLOSE_ACTION,
  USER_FOR_EDITING,
  EDIT_SUCCESS,
  SHOW_EDIT,
} from './types';
import { post, put } from '../../utils/http';
import { ADMIN_USERS_ENDPOINT } from '../../config';
import { displayCustomPopup, closePopup } from '../popups/actions';
import PopupTypes from '../popups/popupTypes';
import { createUserEditRoute } from '../../utils/routeCreators';
import { getUserForEditing } from './selectors';

export const emptyFieldsError = createAction(EMPTY_FIELDS_ERROR);
export const createUserFailure = createAction(CREATE_FAILURE);
export const createUserStart = createAction(CREATE_START);
export const createUserSuccess = createAction(CREATE_SUCCESS, (user) => user);
export const setUsers = createAction(SET_USERS, (users) => users);
export const passwordLengthError = createAction(PASSWORD_LENGTH_ERROR, (value) => value);
export const passwordEqualError = createAction(PASSWORD_EQUAL_ERROR, (value) => value);
export const changeUserTypeValue = createAction(
  FORM_USER_TYPE_INPUT_VALUE,
  (object) => object.target.value,
);
export const changeUsernameValue = createAction(FORM_USERNAME_INPUT_VALUE, (value) => value);
export const changePasswordValue = createAction(FORM_PASSWORD_INPUT_VALUE, (value) => value);
export const changeUserDescriptionValue = createAction(
  FORM_DESCRIPTION_INPUT_VALUE,
  (value) => value,
);
export const changePasswordRepeatValue = createAction(
  FORM_PASSWORD_REPEAT_INPUT_VALUE,
  (value) => value,
);
export const onClose = createAction(ONCLOSE_ACTION);
export const showEdit = createAction(SHOW_EDIT);
export const showEditPopup = () => async (dispatch) => {
  dispatch(showEdit());
  dispatch(displayCustomPopup(PopupTypes.EDIT_USER));
};
export const setUserForEditing = createAction(USER_FOR_EDITING, (value) => value);
export const editUserFailure = createAction(CREATE_FAILURE);
export const editUserSuccess = createAction(EDIT_SUCCESS, (user) => user);

export const onCloseAction = () => async (dispatch) => {
  dispatch(push('/admin/users'));
  dispatch(onClose());
};
export const onCloseEdit = () => async (dispatch) => {
  dispatch(closePopup());
  dispatch(onClose());
};
export const newUser = () => async (dispatch, getState) => {
  const {
    createUser: {
      formUserType, formDescription, formPasswordRepeat, formUsername, formPassword
    },
  } = getState();
  if (!formUsername || !formPassword || !formUserType || !formPasswordRepeat) {
    return dispatch(emptyFieldsError());
  }
  if (formPassword.length < 6) {
    return dispatch(passwordLengthError());
  }
  if (formPassword !== formPasswordRepeat) {
    return dispatch(passwordEqualError());
  }
  dispatch(createUserStart());
  try {
    const data = await post(ADMIN_USERS_ENDPOINT, {
      data: {
        username: formUsername,
        password: formPassword,
        user_type_id: Number(formUserType),
        description: formDescription,
      },
    });
    dispatch(createUserSuccess(data));
    dispatch(push('/admin/users'));
  } catch (e) {
    console.log(e);
    dispatch(createUserFailure());
  }
};
export const editUser = () => async (dispatch, getState) => {
  const {
    createUser: {
      formUsername, formUserType, formDescription
    },
  } = getState();
  const user = getUserForEditing(getState());
  try {
    const data = await put(createUserEditRoute(user.id), {
      data: {
        username: formUsername,
        user_type_id: Number(formUserType),
        description: formDescription,
      },
    });
    dispatch(editUserSuccess(data));
    dispatch(onCloseEdit());
    dispatch(displayCustomPopup(PopupTypes.EDIT_USER_SUCCESS));
  } catch (e) {
    console.log(e);
    dispatch(editUserFailure());
    dispatch(displayCustomPopup(PopupTypes.EDIT_USER_FAILURE));
  }
};
