import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/NavigationBar.css';

class NavigationBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">React</Link>
                        <a className = "navbar-brand" href = "#">React</a>
                    </div>

                    <div className="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">DashBoard <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="/users">All Users</a></li>
                                    <li><a href="">Company Configuration</a></li>
                                    <li><a href="#">Device Configuration</a></li>
                                </ul>
                            </li>
                            <li className = "not-for-dropdown"><Link to="/login" className="navbar-brand">Login</Link></li>
                            <li className = "not-for-dropdown"><Link to="/signup" className="navbar-brand">Sign Up</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;