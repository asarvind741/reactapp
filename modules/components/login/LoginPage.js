import React from 'react';
import { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// https://embed.plnkr.co/plunk/OY91qM
// https://github.com/cornflourblue/react-redux-registration-login-example/blob/master/src/HomePage/HomePage.jsx

import LoginForm from './LoginForm';

import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import { loginUserRequest } from '../../services/SignupService';
import { addUser } from '../actions/UserActions';


class LoginPage extends Component {
    render() {
        const users = this.props.users;
        console.log("users", users);
<<<<<<< HEAD
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
=======
        const { addFlashMessage, loginUserRequest } = this.props;
        return (
            <LoginForm
                addFlashMessage={addFlashMessage}
                loginUserRequest={loginUserRequest}
                users={users}
            />
>>>>>>> d9736b1faacd6c62eb786bacce23f74974feec9d
        );
    }
}

LoginPage.propTypes = {
<<<<<<< HEAD
    loginUserRequest:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    addUser:React.PropTypes.func.isRequired
=======
    loginUserRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
>>>>>>> d9736b1faacd6c62eb786bacce23f74974feec9d
}

function mapStateToProps(state) {
    console.log("state is----", state);
    return {
        user: state.user
    }
}

<<<<<<< HEAD
export default connect(mapStateToProps, {addFlashMessage, loginUserRequest, addUser})(LoginPage);
=======
export default connect(mapStateToProps, { addFlashMessage, loginUserRequest })(LoginPage);
>>>>>>> d9736b1faacd6c62eb786bacce23f74974feec9d
