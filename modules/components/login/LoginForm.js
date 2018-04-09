import React from 'react';
import { PropTypes } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoggedIn:false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.loginUserRequest(this.state)
            .then((response) => {
                console.log("resssssss------", response);
                if(response.status === 200){
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You are logged in now. Enjoy the ride.' 
                    })
                    this.state.isLoggedIn = true;
                    this.context.router.push('/');
                }
                else {
                    this.props.addFlashMessage({
                        type: 'error',
                        text: response.statusText
                    });
                    this.state.isLoggedIn = true;
                    this.context.router.push('/login');
                }

            });

    }
    render() {
  
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <h1 className = "login-class">Please Login To conntiue...</h1>
                <div className="form-group">
                    <label className="control-label">
                        E-Mail:
                    </label>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={this.onChange}
                        name="email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            <p><a href="/forget-password">Forgot Password?</a>.</p>
            <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
            </div>
        );
    }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default LoginForm;