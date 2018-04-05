import React, { Component } from 'react';

import '../styles/Register.css';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                termsAndCondition: false
            }]
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
    }

    handleChange(event) {
        this.setState({

            [event.target.name]: event.target.value
        });
    }
    toggleCheckBox(event) {
        this.setState({
            termsAndCondition: !this.state.termsAndCondition
        })
    }

    handleSubmit(event) {
        event.preventDefault();

    }

    // First Name Validation



    render() {
        return (
            <div className="container">
                <h2>
                    Register Here....
                </h2>
                <form onSubmit={this.handleSubmit} className="form-class">
                    <div>
                        <label>
                            First Name:
                        </label>
                        <input type="text" placeholder="Enter First Name Here..."
                            name="firstName"
                            onChange={this.handleChange} maxLength="10" minLength="4" required />

                        <br></br>
                        <label>
                            Last Name:
                        </label>
                        <input type="text" placeholder="Enter Last Name Here..."
                            name="lastName" onChange={this.handleChange} required />
                        <br></br>
                        <label>
                            Username:
                        </label>
                        <input type="text" placeholder="Enter Username Here..."
                            name="userName" onChange={this.handleChange} required />

                        <br></br>
                        <label>
                            E-Mail:
                            </label>
                        <input type="text" placeholder="Enter Email Here..."
                            name="email" onChange={this.handleChange} required />

                        <br></br>
                        <label>
                            Password:
                            </label>
                        <input type="text" placeholder="Enter Password Here..."
                            name="password" onChange={this.handleChange} required />

                        <br></br>
                        <label>
                            Confirm Password:
                            </label>
                        <input type="text" placeholder="Confirm Your Password Here..."
                            name="confirmPassword" onChange={this.handleChange} required />

                        <br></br>
                        <label>
                        </label>
                        <input type="checkbox"
                            name="termsAndCondition" value={this.state.termsAndCondition} onChange={this.toggleCheckBox} required />I agree with Terms & Conditions
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div >
        )
    }
}

export default Register;