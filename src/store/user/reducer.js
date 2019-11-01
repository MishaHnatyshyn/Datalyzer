import { SET_USER_DATA, CLEAR_USER_DATA } from './types';

const initialState = {
  username: '',
  userType: '',
  userId: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
}
