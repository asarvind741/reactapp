import React from 'react';
import { Component } from 'react';

import SignupForm from './SignupForm';

import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/SignupActions';
import { addFlashMessage } from '../actions/addFlashMessage';
import { addUser } from '../actions/UserActions';

class SignupPage extends Component{
    render(){
       const { userSignupRequest, addFlashMessage, addUser } = this.props;
        return(
           <div className = "row">
               <div className = "col-lg-4 col-md-offset-4">
                   <SignupForm 
                   userSignupRequest = {userSignupRequest}
                   addFlashMessage={addFlashMessage}
                   addUser = { addUser} />
               </div>
           </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    addUser: React.PropTypes.func.isRequired

}

function mapStateToProps(state){
    return {
        users: state.users
    }
}

export default connect( null , {userSignupRequest, addFlashMessage, addUser}) (SignupPage);