/* import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './modules/components/Login';
import { Provider } from 'react-redux';
import store from './modules/components/store/UserStore'

ReactDOM.render(
  <Provider store={store}>
    <LoginForm />
  </Provider>,
  document.getElementById('app')
);
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './modules/routes';
import rootReducer from './modules/components/rootReducers';

import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose  } from 'redux';
import ReduxPromise from 'redux-promise';

import { configureFakeBackend } from './modules/components/helpers/FakeBackend';

configureFakeBackend();

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxPromise))); */

const store = createStore(
  rootReducer,
  compose(
  // (state = {}) => state,
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
   <Provider store = {store}>
      <Router history = {browserHistory} routes = {routes} />
   </Provider>, document.getElementById('app'));