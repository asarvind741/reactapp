import React from 'react';
import { deleteUser,updateUserNow } from '../actions/TableActions';
import PersonRow from './PersonRow';
import {connect} from 'react-redux';
import { addFlashMessage } from '../actions/addFlashMessage';
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn, TablePagination,
        TableSortLabel} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';


export class UsersForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userslist: [],
            userlistFromChild:[]

        };
        this.myCallback = this.myCallback.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    componentDidMount() {
        this.props.getUsersList().then(response => {
            if (response.status === 200) {
                this.setState({ userslist: response.usersList });
            }
        });
    }
    myCallback (dataFromChild) {
        this.setState({ userslist: dataFromChild });
    }
    addUser(event){
        console.log("check row method");
        
        var row = {
            id:this.state.userslist.length + 1,
            firstname:"",
            lastname:"",
            email:""
        };
        console.log(row);
        this.state.userslist.push(row);
        this.setState({})
        console.log(this.state.userslist);
    }
    render() {
        console.log("state row", this.state.userslist);
        let rows = this.state.userslist.map(person => {
            return (
                <PersonRow key={person.id} data={person} 
                deleteUser = {this.props.deleteUser}
                updateUserNow = {this.props.updateUserNow}
                addFlashMessage = {this.props.addFlashMessage}
                myCallback = {this.myCallback} />
            );
        })
        return (
            <div>
            <button className = "btn btn-primary" onClick ={this.addUser}>Add New User</button>
            <MuiThemeProvider>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>First Name</TableHeaderColumn>
                        <TableHeaderColumn>Last Name</TableHeaderColumn>
                        <TableHeaderColumn>E-Mail</TableHeaderColumn>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
            </MuiThemeProvider>
            </div>
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
    addFlashMessage: React.PropTypes.func.isRequired
};

UsersForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}


export default connect(null, { deleteUser, addFlashMessage,updateUserNow})(UsersForm);