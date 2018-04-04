import React from 'react';
import axios from 'axios';

class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            confirmpassword:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    onSubmit(event){
        event.preventDefault();
        // axios.post('api/users', {user:this.state});
        this.props.userSignupRequest(this.state);
        console.log(this.state);
    }
    render(){

        return(
            <form onSubmit = {this.onSubmit}>
                <h1>Join Our Community</h1>
                <div className = "form-group">
                    <label className = "control-label">
                        First Name:
                    </label>
                    <input
                       type = "text"
                       value = { this.state.firstname}
                       onChange = { this.onChange}
                       name = "firstname"
                       className = "form-control"
                    />
                </div>

                <div className = "form-group">
                    <label className = "control-label">
                        Last Name:
                    </label>
                    <input
                       type = "text"
                       value = {this.state.lastname}
                       onChange = { this.onChange}
                       name = "lastname"
                       className = "form-control"
                    />
                </div>

                <div className = "form-group">
                    <label className = "control-label">
                        E-Mmail:
                    </label>
                    <input
                       type = "email"
                       value = { this.state.email }
                       onChange = { this.onChange}
                       name = "email"
                       className = "form-control"
                    />
                </div>

                <div className = "form-group">
                    <label className = "control-label">
                        Password:
                    </label>
                    <input
                       type = "password"
                       value = { this.state.password }
                       onChange = { this.onChange}
                       name = "password"
                       className = "form-control"
                    />
                </div>

                <div className = "form-group">
                    <label className = "control-label">
                        Confirm Password:
                    </label>
                    <input
                       type = "password"
                       value = { this.state.confirmpassword }
                       onChange = { this.onChange}
                       name = "confirmpassword"
                       className = "form-control"
                    />
                </div>

                <div className = "form-group">
                    <button className = "btn btn-primary btn-lg">
                        Sign Up
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest:React.PropTypes.func.isRequired
}

export default SignupForm;