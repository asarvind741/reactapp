import React from 'react';
import './SideBar.css';

class Sidebar extends React.Component {
    render(){
    return (
        <div className="sidenav">
            <a href="#">Brand Quiz</a>
            <a href="javascript-quiz">JavaScript Quiz</a>
            <a href="node-quiz-1">NodeJs Quiz</a>
            <a href="angular-quiz-1">Angular Quiz</a>
            <a href="react-quiz-1">React Quiz</a>
        </div>
    )
}

}

export default Sidebar;