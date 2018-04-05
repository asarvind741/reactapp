import React from 'react';
import { Component } from 'react';

import LoginForm from './LoginForm';

import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import { loginUserRequest } from '../actions/SignupActions';


class LoginPage extends Component{
    render(){
        const users = this.props.users;
        console.log("users", users);
        const { addFlashMessage, loginUserRequest } = this.props;
        return(
           <div className = "row">
               <div className = "col-lg-4 col-md-offset-4">
                   <LoginForm 
                   addFlashMessage={addFlashMessage}
                   loginUserRequest={loginUserRequest}
                   users = {users}
                    />
               </div>
           </div>
        );
    }
}

LoginPage.propTypes = {
    loginUserRequest:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
    console.log("state----", state);
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, {addFlashMessage, loginUserRequest})(LoginPage);