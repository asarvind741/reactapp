import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../helpers/Auth';
import LoginPage from '../login/LoginPage';
import { deleteUser } from '../actions/UserActions';

class Logout extends React.Component{
    componentWillMount () {
        const user = localStorage.getItem('currentUser');
        this.props.deleteUser(user);
        localStorage.removeItem('currentUser');
        this.context.router.push('/login');
    }
    
    render(){
        const { deleteUser} = this.props;
             return (
                 <h4>Logging out. Please wait...</h4>
             )
    }
}



Logout.contextTypes = {
    router: React.PropTypes.object.isRequired
}

LoginPage.propTypes = {
    deleteUser:React.PropTypes.func.isRequired
}

export default connect(null,{deleteUser})(Logout);