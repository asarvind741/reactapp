import React, { Component } from 'react';
import { render } from 'react-dom';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Header from './Header';
import Register from './Register';
import { Navbar } from "react-bootstrap";

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavigationBar from './NavigationBar';

class App extends Component {
   render() {
      return (
         <div className = "container">
             <NavigationBar />
             { this.props.children }
        </div>
      );
   }
}
export default App;