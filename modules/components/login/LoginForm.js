import React from 'react';
import { PropTypes } from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
            .then(() => {

            },
            (err) => {
                const users = this.props.users;
                const checkUserInStore = users.filter(user => user.email === this.state.email);
                if (checkUserInStore.length>0) {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You are logged in now. Enjoy the ride.'
                    })
                    this.context.router.push('/')
                }
                else {
                    this.props.addFlashMessage({
                        type: 'error',
                        text: 'You are not registed yet. Please register first to continue.'
                    })
                    this.context.router.push('/signup')
                }

            }
            )

    }
    render() {
  
        return (
            <form onSubmit={this.onSubmit}>
                <h1 className = "login-class">Please Login To conntiue...</h1>
                <div className="form-group">
                    <label className="control-label">
                        E-Mmail:
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
        );
    }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default LoginForm;