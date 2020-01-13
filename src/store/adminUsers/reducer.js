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
  FETCH_END,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  EDIT_SUCCESS,
} from './types';

const initialState = {
  totalUsers: {
    count: 0,
    isLoading: true
  },
  currentPage: 1,
  search: '',
  itemsPerPage: 6,
  lastLoadedPage: 1,
  error: false,
  isLoading: false,
  hasNextPage: false,
  users: [],
  isCreatingInProgress: false,
  isVisible: true,
  userForDeleting: null,
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
    case FETCH_END:
      return {
        ...state,
        isLoading: false,
        lastLoadedPage: action.payload,
        error: false,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        hasNextPage: action.payload.length < state.totalUsers.count,
      };
    case APPEND_USERS:
      const users = [...state.users, ...action.payload];
      return {
        ...state,
        users,
        totalUsers: {
          count: state.totalUsers.count + 1,
          isLoading: false
        },
        hasNextPage: users.length < state.totalUsers.count,
      };
    case NEXT_PAGE:
      const nextPage = state.currentPage + 1;
      return {
        ...state,
        currentPage: nextPage,
        hasNextPage: nextPage * state.itemsPerPage < state.totalUsers.count,
      };
    case PREV_PAGE:
      const prevPage = state.currentPage - 1;
      return {
        ...state,
        currentPage: prevPage,
        hasNextPage: prevPage * state.itemsPerPage < state.totalUsers.count
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
        errorMessage: 'Creation failed'
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
        totalUsers: {
          count: state.totalUsers.count + 1,
          isLoading: false
        },
      };
    case DELETE_USER:
      return {
        ...state,
        userForDeleting: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        totalUsers: {
          count: state.totalUsers.count - 1,
          isLoading: false
        },
        users: state.users.filter(
          (user) => user.id !== state.userForDeleting,
        ),
        userForDeleting: null,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        users: state.users.map(
          (user) => (user.id === action.payload.id ? { ...user, ...action.payload } : user)
        ),
      };
    default:
      return state;
  }
}
