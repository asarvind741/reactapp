import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ForgotPassword from './components/password-reset/ForgotPassword';
import Users from './components/users/Users';
import Company from './components/company/Company';
import Settings from './components/settings/Settings';
<<<<<<< HEAD
import Logout from './components/logout/Logout';
=======
// import withStyles from './components/users/withStyles';
>>>>>>> d9736b1faacd6c62eb786bacce23f74974feec9d

export default (
  <Route path= "/" component = { App }>
    <IndexRoute component = { Greetings } />
    <Route path = "signup" component = { SignupPage } />
    <Route path = "login" component = { LoginPage} />
    <Route path = "forget-password" component = { ForgotPassword } />
    <Route path = "users" component = { Users } />
    <Route path = "company" component = {Company} />
    <Route path = 'settings' component = {Settings} />
<<<<<<< HEAD
    <Route path = 'logout' component = {Logout} />
=======
    {/* <Route path = "test" component = { withStyles} /> */}
>>>>>>> d9736b1faacd6c62eb786bacce23f74974feec9d
  </Route>
)