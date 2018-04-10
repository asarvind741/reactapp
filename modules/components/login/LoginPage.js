import React from 'react';
import { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// https://embed.plnkr.co/plunk/OY91qM
// https://github.com/cornflourblue/react-redux-registration-login-example/blob/master/src/HomePage/HomePage.jsx

import LoginForm from './LoginForm';

import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import { loginUserRequest } from '../actions/SignupActions';


class LoginPage extends Component {
    render() {
        const users = this.props.users;
        console.log("users", users);
        const { addFlashMessage, loginUserRequest } = this.props;
        return (
            <LoginForm
                addFlashMessage={addFlashMessage}
                loginUserRequest={loginUserRequest}
                users={users}
            />
        );
    }
}

LoginPage.propTypes = {
    loginUserRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    console.log("state is----", state);
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { addFlashMessage, loginUserRequest })(LoginPage);