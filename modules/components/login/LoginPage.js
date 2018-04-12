import React from 'react';
import { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// https://embed.plnkr.co/plunk/OY91qM
// https://github.com/cornflourblue/react-redux-registration-login-example/blob/master/src/HomePage/HomePage.jsx
// http://www.lorejs.org/quickstart/authentication/step-5/
import LoginForm from './LoginForm';

import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import { loginUserRequest } from '../../services/SignupService';
import { addUser } from '../actions/UserActions';
import { setAuthorization } from '../helpers/Auth';


class LoginPage extends Component {
    render() {
        const users = this.props.users;
        console.log("users", users);
        const { addFlashMessage, loginUserRequest, addUser, setAuthorization} = this.props;
        return(
                <LoginForm 
                   addFlashMessage={addFlashMessage}
                   loginUserRequest={loginUserRequest}
                   users = {users}
                   addUser = { addUser}
                   setAuthorization = { setAuthorization }
                    />
        );
    }
}

LoginPage.propTypes = {
    loginUserRequest:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    addUser:React.PropTypes.func.isRequired,
    setAuthorization:React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    console.log("state is----", state);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {addFlashMessage, loginUserRequest, addUser, setAuthorization})(LoginPage);
