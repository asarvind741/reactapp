import React from 'react';

export class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.forgotUserRequest(this.state).then((response) => {
            if (response.status === 200) {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Your Password has ben changed successfully. Please Login now.'
                });
                this.context.router.push('/login')
            } else {
                this.props.addFlashMessage({
                    type: 'error',
                    text: response.statusText
                });
                this.context.router.push('/forget-password')
            }

        });
    }





    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <h1 className = "login-class">Please Reset Your Password Here...</h1>
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">
                        New Password:
                    </label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.onChange}
                        name="confirmPassword"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
            </div>
        );
    }
}

ForgotPasswordForm.propTypes = {
    forgotUserRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

ForgotPasswordForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default ForgotPasswordForm;