import 'bootstrap/dist/css/bootstrap.css';

import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { Routes } from './routes';
import { configureStore } from './store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={createBrowserHistory()}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
