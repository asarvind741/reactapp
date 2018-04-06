import React from 'react';
import { Component } from 'react';
import UsersForm from './UsersForm';
import { connect } from 'react-redux';
import { getUsersList } from '../actions/SignupActions';

class Users extends React.Component {
    render(){
        const { getUsersList } = this.props;
        return (
            <div className = "row">
            <div className = "col-lg-4 col-md-offset-4">
                <UsersForm 
                getUsersList={getUsersList}
                 />
            </div>
        </div>
        );
    }
}

Users.propTypes = {
    getUsersList:React.PropTypes.func.isRequired
}

export default connect(null, { getUsersList })(Users);