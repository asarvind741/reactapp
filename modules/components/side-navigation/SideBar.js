import React from 'react';
import './SideBar.css';

class Sidebar extends React.Component {
    render(){
    return (
        <div className="sidenav">
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    )
}

}

export default Sidebar;