import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import isEmpty from 'lodash/isEmpty';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './src/rootReducer';
import routes from './routes';
import htmlActions from './htmlActions.js';
import { validateToken, setUser } from './src/actions/signinActions';

const socket = io();
socket.on('connection is alive', data => (data));

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  validateToken(localStorage.jwtToken, store.dispatch);
} else {
  localStorage.removeItem('jwtToken');
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
