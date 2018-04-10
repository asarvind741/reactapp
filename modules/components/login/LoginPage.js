import React from 'react';
import { Component } from 'react';

import LoginForm from './LoginForm';

import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import { loginUserRequest } from '../../services/SignupService';
import { addUser } from '../actions/UserActions';


class LoginPage extends Component{
    render(){
        const users = this.props.users;
        console.log("users", users);
        const { addFlashMessage, loginUserRequest, addUser} = this.props;
        return(
           <div className = "row">
               <div className = "col-lg-4 col-md-offset-4">
                   <LoginForm 
                   addFlashMessage={addFlashMessage}
                   loginUserRequest={loginUserRequest}
                   users = {users}
                   addUser = { addUser}
                    />
               </div>
           </div>
        );
    }
}

LoginPage.propTypes = {
    loginUserRequest:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    addUser:React.PropTypes.func.isRequired
}

function mapStateToProps(state){
    console.log("state is----", state);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {addFlashMessage, loginUserRequest, addUser})(LoginPage);