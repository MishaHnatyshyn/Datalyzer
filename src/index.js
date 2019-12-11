import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import './assets/main.scss';
import Loader from './components/shared/Loader';
import { checkAuthStatus } from './store/login/actions';

const App = React.lazy(() => import('./components/App'));

store.dispatch(checkAuthStatus());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
