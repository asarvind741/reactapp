import React from 'react';

export class UsersForm extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            userslist : []
        };
    }
    componentDidMount(){
        this.props.getUsersList().then(response => {
            if(response.status === 200){
                this.setState({ userslist:response.usersList});
                console.log("state user list", this.state.userslist);
            }
        });
    }
    render() {
        var listedUsers = this.state.userslist.map(function(user) 
        {
        return (
            <div>
                <h4>Here is complete user list</h4>
                <table className="table" user of usersList>
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">E-Mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                </tbody>
               </table>
        </div>
        );
    }
)}
}

UsersForm.propTypes = {
    getUsersList: React.PropTypes.func.isRequired
};

UsersForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default UsersForm;