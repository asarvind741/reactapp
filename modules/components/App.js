/* import React from 'react'

class App extends React.Component {
    render() {
        return (
        <div>
            <h1>Hello, React Router!</h1>
            <p>This is first React program</p>
        </div>
        )
}}

export default App; */

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Header from './Header';
import Register from './Register';
import { Navbar } from "react-bootstrap";

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
   render() {
      return (
         <Router>
            <div>
              <h2>Welcome to React Router Tutorial</h2>
               <ul>
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                  <li><Link to={'/Register'}>Register</Link></li>
               </ul>
               <hr /> 
               
               <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/Login' component={Login} />
                  <Route exact path='/Register' component={Register} />
               </Switch>
            </div>
         </Router>
      );
   }
}
export default App;