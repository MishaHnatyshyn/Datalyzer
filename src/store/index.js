import {
  applyMiddleware, combineReducers, compose, createStore
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import loginReducer from './login/reducer';
import userReducer from './user/reducer';
import adminUsersReducer from './adminUsers/reducer';
import modelReducer from './model/reducer';
import connectionsReducer from './connection/reducer';
import connectionFormsReducer from './connectionForm/reducer';
import createUserReducer from './createUser/reducer';

const initialState = {};

const composeEnhancers = typeof window === 'object'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const rootReducer = combineReducers({
  router: connectRouter(history),
  login: loginReducer,
  user: userReducer,
  adminUsers: adminUsersReducer,
  models: modelReducer,
  connections: connectionsReducer,
  connectionForms: connectionFormsReducer,
  createUser: createUserReducer,
});

const store = createStore(rootReducer, initialState, enhancer);

export default store;
