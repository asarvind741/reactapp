import React from 'react';
import { deleteUser } from '../actions/TableActions';
import PersonRow from './PersonRow';
import {connect} from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';



export class UsersForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userslist: [],

        };
    }

    componentDidMount() {
        this.props.getUsersList().then(response => {
            if (response.status === 200) {
                this.setState({ userslist: response.usersList });
                // console.log("state user list", this.state.userslist);
            }
        });
    }

   
    render() {

        let rows = this.state.userslist.map(person => {
            return (
                <PersonRow key={person.email} data={person} 
                deleteUser = {this.props.deleteUser}
                addFlashMessage = {addFlashMessage} />
            );
        })
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">E-Mail</th>

                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

/* const PersonRow = (props) => {

    return (
        <tr>
            <td>
                {props.data.firstname}
            </td>
            <td>
                {props.data.lastname}
            </td>
            <td>
                {props.data.email}
            </td>
            <td>
            <input type="button" className="btn btn-primary" value="Edit" /* onClick={this.handleRemoveUser} />
            </td>
            <td>
                <input type="button" className="btn btn-danger" value="Remove" /* onClick={this.handleRemoveUser}  />
            </td>
        </tr>
    )
} */



UsersForm.propTypes = {
    getUsersList: React.PropTypes.func.isRequired,
    deleteUser:React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
};

UsersForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default connect(null, {deleteUser, addFlashMessage})(UsersForm);