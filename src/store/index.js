import {
  applyMiddleware, combineReducers, compose, createStore
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import reduxLogger from 'redux-logger';
import loginReducer from './login/reducer';
import userReducer from './user/reducer';
import adminUsersReducer from './adminUsers/reducer';
import modelReducer from './model/reducer';
import connectionsReducer from './connection/reducer';
import createModelReducer from './createModel/reducer';
import popupsReducer from './popups/reducer';

const initialState = {};

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(reduxLogger);
}

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
  createModel: createModelReducer,
  popups: popupsReducer,
});

const store = createStore(rootReducer, initialState, enhancer);

export default store;
