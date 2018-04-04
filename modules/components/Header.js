import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import Home from './Home';

class Header extends Component {
    render() {
        return (
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">
                  React App
                </a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem
                  eventKey={1}
                  href="/">
                  Home
                </NavItem>
                <NavItem
                  eventKey={2}
                  href="/Login">
                  Login
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
}
export default Header;