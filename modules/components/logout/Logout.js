import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../services/SignupService';
import LoginForm from '../login/LoginForm';

class Logout extends React.Component{
    componentDidUpdate(){
        this.props.logoutUser(this.props.users);
    }
    render(){
        const {logoutUser, user} = this.props;
        return(
            <div className = "row">
               <div className = "col-lg-4 col-md-offset-4">
                   <h5>Thanks for Visiting us. Please re-login to continue with us..</h5>
                   <LoginForm
                    />
               </div>
           </div>
        )
    }
}

Logout.propTypes = {
    logoutUser:React.PropTypes.func.isRequired,
}

function mapStateToProps(state){
    console.log("state is----", state);
    return {
        user:state.users[0],
        isLoggedIn: state.users[0].isLoggedIn
    }
}

export default connect(null, {logoutUser})(Logout);