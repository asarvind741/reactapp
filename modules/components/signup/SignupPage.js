import React from 'react';
import { Component } from 'react';

import SignupForm from './SignupForm';

import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/SignupActions';

class SignupPage extends Component{
    render(){
        const userSignupRequest = this.props;
        return(
           <div className = "row">
               <div className = "col-lg-4 col-md-offset-4">
                   <SignupForm userSignupRequest = {userSignupRequest} />
               </div>
           </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest:React.PropTypes.func.isRequired
}


export default connect((state) => {return {} }, {userSignupRequest}) (SignupPage);