import React from 'react';
import { Component } from 'react';

import SignupForm from './SignupForm';

import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/SignupActions';
import { addFlashMessage } from '../actions/addFlashMessage';

class SignupPage extends Component{
    render(){
       // const { userSignupRequest, addFlashMessage } = this.props;
       console.log(this.props);
        return(
           <div className = "row">
               <div className = "col-lg-4 col-md-offset-4">
                   <SignupForm 
                   userSignupRequest = {userSignupRequest}
                   addFlashMessage={addFlashMessage}  />
               </div>
           </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,

}


export default connect( null , {userSignupRequest, addFlashMessage}) (SignupPage);