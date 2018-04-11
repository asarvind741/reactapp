import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../services/SignupService';
import LoginPage from '../login/LoginPage';

class Logout extends React.Component{
    componentWillMount () {
        console.log(this.props.user);
        logoutUser();
        this.context.router.push('/');
    }
    
    render(){
        const { user } = this.props.user;
             return null;
    }
}
function mapStateToProps(state) {
    console.log("state is----", state);
    return {
        user: state.user
    }
}

Logout.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Logout);