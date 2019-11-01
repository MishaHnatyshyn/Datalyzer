import {
  applyMiddleware, combineReducers, compose, createStore
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import loginReducer from './login/reducer';
import userReducer from './user/reducer';

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
  login: loginReducer,
  router: connectRouter(history),
  user: userReducer,
});

const store = createStore(rootReducer, initialState, enhancer);

export default store;
