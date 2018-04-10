import React from 'react';
import { Component } from 'react';

import ForgotPasswordForm from './ForgotPasswordForm';

import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import { forgotUserRequest } from '../../services/SignupService';


class ForgotPassword extends Component{
    render(){
        const { addFlashMessage, forgotUserRequest } = this.props;
        return(
           <div className = "row">
               <div className = "col-lg-4 col-md-offset-4">
                   <ForgotPasswordForm 
                   addFlashMessage={addFlashMessage}
                   forgotUserRequest={forgotUserRequest}
                    />
               </div>
           </div>
        );
    }
}

ForgotPassword.propTypes = {
    forgotUserRequest:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, {addFlashMessage, forgotUserRequest})(ForgotPassword);