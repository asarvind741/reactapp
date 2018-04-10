import React from 'react';
import { Component } from 'react';
import {updateUserNow} from '../../services/UserService';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { PropTypes } from 'react'
class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            company:'Synapse',
            role:'User'

        };     
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeRole = this.handleChangeRole.bind(this)

    }

    componentDidMount() {
        this.setState(JSON.parse(localStorage.getItem('currentuser')))
    }

    onChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );

    }
    handleChange(event, index, value) {
        console.info(this.state)
         this.setState({company:value});
    }

    handleChangeRole(event, index, value) {
        console.info(this.state)
         this.setState({role:value});
    }

    onSubmit(event) {
        event.preventDefault()
        console.log(this.state);
        console.log(this.props)
        this.props.updateUserNow(this.state).then(response=>{
            if(response.status === 200){
              //  this.props.myCallback (response.users);
              console.log(this.state)
              localStorage.setItem('currentuser',JSON.stringify(this.state))
                this.props.addFlashMessage({
                    type: 'success',
                    text: response.statusText
                });
            }
            else{
                this.props.addFlashMessage({
                    type: 'error',
                    text: response.statusText
                });
            }
        });
    }


    render(){
        const { updateUserNow,addFlashMessage} = this.props;

    return (
        <form onSubmit={this.onSubmit}>
            <h1 className = "login-class">Edit Info</h1>
            <div className="form-group">
                <label className="control-label">
                    First Name:
                </label>
                <input
                    type="text"
                    value={this.state.firstname}
                    onChange={this.onChange}
                    name="firstname"
                    className="form-control"
                    required
                    minLength = "4"
                    maxLength = "10"
                />
            </div>

            <div className="form-group">
                <label className="control-label">
                    Last Name:
                </label>
                <input
                    type="text"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    name="lastname"
                    className="form-control"
                    required
                    minLength = "2"
                    maxLength = "10"
                />
            </div>

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
                     Company:
                </label>
                <MuiThemeProvider>
                <DropDownMenu value={this.state.company} onChange={this.handleChange}>
                <MenuItem value="Synapse" primaryText="Synapse" />
                <MenuItem value="Google" primaryText="Google" />
                <MenuItem value="NTT" primaryText="NTT" />
                <MenuItem value="Corbus" primaryText="Corbus" />
               
            </DropDownMenu>
            </MuiThemeProvider>
            </div>

             <div className="form-group">
                <label className="control-label">
                     Role:
                </label>
                <MuiThemeProvider>
                <DropDownMenu value={this.state.role} onChange={this.handleChangeRole}>
                <MenuItem value="Manager" primaryText="Manager" />
                <MenuItem value="User" primaryText="User" />
                <MenuItem value="Admin" primaryText="Admin" />
               
            </DropDownMenu>
            </MuiThemeProvider>
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


export default connect(null, { updateUserNow,addFlashMessage})(Settings);