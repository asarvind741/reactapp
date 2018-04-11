import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../services/SignupService';
import LoginPage from '../login/LoginPage';

class Logout extends React.Component{
    componentWillMount () {
        console.log(localStorage.getItem('currentUser'));
        localStorage.removeItem('currentUser');
        this.context.router.push('/');
    }
    
    render(){
             return (
                 <h4>Logging out. Please wait...</h4>
             )
    }
}


Logout.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect()(Logout);