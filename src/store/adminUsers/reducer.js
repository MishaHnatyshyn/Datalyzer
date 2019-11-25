import {
  CHANGE_FORM_FIELD,
  FETCH_FAILURE,
  FETCH_START,
  SET_USERS,
  APPEND_USERS,
  NEXT_PAGE,
  PREV_PAGE,
  CREATE_SUCCESS,
  CREATE_START,
  CREATE_FAILURE,
  SET_TOTAL_USERS,
  CHANGE_SEARCH_INPUT,
  FETCH_COUNT_START,
  FETCH_COUNT_FAILURE,
} from './types';

const initialState = {
  totalUsers: {
    count: 0,
    isLoading: true
  },
  currentPage: 1,
  search: '',
  itemsPerPage: 4,
  lastLoadedPage: 1,
  error: false,
  isLoading: false,
  hasNextPage: true,
  users: [],
  newUserForm: {
    formUsername: '',
    formPassword: '',
    formPasswordRepeat: '',
    formUserType: '',
    formDescription: '',
    isCreatingInProgress: false,
  }
};

export default function adminUsersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNT_START:
      return {
        ...state,
        totalUsers: {
          isLoading: true
        }
      };
    case FETCH_COUNT_FAILURE:
      return {
        ...state,
        totalUsers: {
          count: 0,
          isLoading: false
        }
      };
    case SET_TOTAL_USERS:
      return {
        ...state,
        totalUsers: {
          count: action.payload,
          isLoading: false
        }
      };
    case FETCH_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        error: false,
        isLoading: false
      };
    case APPEND_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
        hasNextPage: action.payload.length > 0,
        error: false,
        isLoading: false
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1
      };
    case CHANGE_FORM_FIELD:
      return {
        ...state,
        newUserForm: {
          ...state.newUserForm,
          [action.payload.field]: action.payload.value
        }
      };
    case CREATE_START:
      return {
        ...state,
        isCreatingInProgress: true
      };
    case CREATE_FAILURE:
      return {
        ...state,
        isCreatingInProgress: false,
        error: true,
      };
    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        search: action.payload,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        isCreatingInProgress: false,
        formUsername: '',
        formPassword: '',
        formPasswordRepeat: '',
        formUserType: '',
        formDescription: '',
      };
    default:
      return state;
  }
}
