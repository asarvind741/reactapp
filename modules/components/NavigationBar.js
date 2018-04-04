import React, { Component} from 'react';
import { Link } from 'react-router';
import '../styles/NavigationBar.css';

class NavigationBar extends Component {
    render(){
    return (
        <nav className = "navbar navbar-default">
            <div className = "container-fluid">
                <div className = "navbar-header">
                    <Link to = "/" className = "navbar-brand">React</Link>
                    {/* <a className = "navbar-brand" href = "#">React</a> */}
                </div>

                <div className = "navbar-collapse">
                    <ul className = "nav navbar-nav navbar-right">
                    <Link to = "/signup" className = "navbar-brand">Sign Up</Link>
                        {/* <a href = "#">Sign Up</a> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
}

export default NavigationBar;