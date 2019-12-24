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
import createReportReducer from './createReport/reducer';
import connectionFormsReducer from './connectionForm/reducer';
import createUserReducer from './createUser/reducer';
import dashboardReducer from './dashboard/reducer';
import userDashboardReducer from './userDashboard/reducer';

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
  connectionForms: connectionFormsReducer,
  connections: connectionsReducer,
  createUser: createUserReducer,
  createModel: createModelReducer,
  popups: popupsReducer,
  createReport: createReportReducer,
  dashboard: dashboardReducer,
  userDashboard: userDashboardReducer,
});

const store = createStore(rootReducer, initialState, enhancer);

export default store;
