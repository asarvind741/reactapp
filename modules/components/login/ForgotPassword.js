import React from 'react';

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            newPassword: '',
            confirmNewPassword: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("state for forgot password", this.state);
        const users = this.props.users;
        const checkUserInStore = users.filter(user => user.email === this.state.email);
        if (checkUserInStore.length > 0) {
            this.props.addFlashMessage({
                type: 'success',
                text: 'Your Password has be changed successfully.'
            })
            this.context.router.push('/login')
        }
        else {
            this.props.addFlashMessage({
                type: 'error',
                text: 'You are not registed yet. Please register first to continue.'
            })
            this.context.router.push('/signup')
        }

    }





render() 
{
    return 
    (
        <div>
            <form onSubmit={this.onSubmit}>
                <h1 className="login-class">Please Reset Your Password here...</h1>
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
                        New Password:
                    </label>
                    <input
                        type="password"
                        value={this.state.newPassword}
                        onChange={this.onChange}
                        name="newPassword"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">
                    Confirm New Password:
                    </label>
                <input
                    type="password"
                    value={this.state.confirmNewPassword}
                    onChange={this.onChange}
                    name="confirmNewPassword"
                    className="form-control"
                />
                </div>
            <div className="form-group">
                <button className="btn btn-primary btn-lg" type="submit">
                    Submit
                    </button>
            </div>
            </form>
        </div >
    )
}
}


export default ForgotPassword;