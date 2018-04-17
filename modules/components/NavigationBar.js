import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/NavigationBar.css';

class NavigationBar extends Component {
    render() {
        const isLoggedIn = localStorage.getItem('currentUser');
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">React</Link>
                    </div>

                    <div className="navbar-collapse">
                        <ul className="nav navbar-nav">
                        {(isLoggedIn)?
                            <li className="dropdown">
                                <Link to="#" className="dropdown-toggle navbar-dropdown" data-toggle="dropdown" role="button"  aria-expanded="false">DashBoard <span className="caret"></span></Link>
                                <ul className="dropdown-menu">
                                    <li><a className = "dropdown-list-options" href="/users">All Users</a></li>
                                    <li><a className = "dropdown-list-options" href="/company">Company Configuration</a></li>
                                    <li><a className = "dropdown-list-options" href="#">Device Configuration</a></li>
                                    <li><a className = "dropdown-list-options" href="/settings">Settings</a></li>
                                </ul>
                            </li>
                            :''
                        }
                            {(!isLoggedIn)?
                            <li className = "not-for-dropdown"><Link to="/login" className="navbar-brand">Login</Link></li>
                            : <li className = "not-for-dropdown"><Link to="/logout" className="navbar-brand">Logout</Link></li>
                            }
                            {(!isLoggedIn)?
                            <li className = "not-for-dropdown"><Link to="/signup" className="navbar-brand">Sign Up</Link></li>
                            :
                            <li className = "not-for-dropdown"><Link to="/signup" className="navbar-brand">My Account</Link></li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}


export default NavigationBar;