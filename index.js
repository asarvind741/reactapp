/* import React from 'react';
import { render } from 'react-dom'
import App from './modules/components/App.js'

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router, BrowserRouter  } from 'react-router-dom';

render(<App/>, document.getElementById('app'))
 */

import React from 'react';
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