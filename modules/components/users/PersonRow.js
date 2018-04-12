import React from 'react';
import EditIcon from "material-ui/svg-icons/image/edit";
import TrashIcon from "material-ui/svg-icons/action/delete";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import TextField from "material-ui/TextField";
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import updateUserNow from '../../services/UserService';

class PersonRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userslist:'',
            isEditing:false
        };
        this.handleRemoveUser = this.handleRemoveUser.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        this.setState({ user: this.props.data });
    }
    

    handleRemoveUser() {
        event.preventDefault();
        this.props.deleteUser(this.state.user).then(response=>{
            if(response.status === 200){
                this.props.myCallback (response.users);
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


    handleEditUser(){
        this.props.updateUserNow(this.state.user).then(response=>{
            if(response.status === 200){
                this.props.myCallback (response.users);
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
        if(this.state.isEditing == false)
        this.setState({isEditing: true});
        else if(this.state.isEditing == true)
        this.setState({isEditing:false});
        console.log("edit me", this.state.isEditing);
    }

    saveUser(event){
        if(this.state.isEditing == false)
        this.setState({isEditing: true});
        else if(this.state.isEditing == true)
        this.setState({isEditing:false});
        console.log("edit me", this.state.isEditing);

    }

    updateUser(event){
        let user = this.state.user;
        console.log(event.target.value);
        console.log(event.target.name)
        user[event.target.name]= event.target.value;
        this.setState(user);
        
    }

    render() {
        let row = this.state.user;
        const isEditing = this.state.isEditing;
        console.log("prps=====", this.props);
        return (
            <MuiThemeProvider>
            <TableRow>
                <TableRowColumn>{ isEditing ? ( <TextField name = "firstname" onChange = {this.updateUser} value = {row.firstname}/>):
                ( row.firstname)
                }
                </TableRowColumn>
                <TableRowColumn>
                    { isEditing ? ( <TextField name = "lastname" onChange = {this.updateUser} value = {row.lastname}/>):
                ( row.lastname)
                }</TableRowColumn>
                <TableRowColumn>
                    { isEditing ? ( <TextField name = "email" onChange = {this.updateUser} value = {row.email}/>):
                ( row.email)
                }</TableRowColumn>
                <TableRowColumn>
                    { isEditing ? ( <TextField name = "role" onChange = {this.updateUser} value = {row.role}/>):
                ( row.role)
                }</TableRowColumn>
                <TableRowColumn>
                    { isEditing ? ( <TextField name = "company" onChange = {this.updateUser} value = {row.company}/>):
                ( row.company)
                }</TableRowColumn>
                <TableRowColumn>
                { isEditing ? (
                <CheckIcon onClick={this.handleEditUser}/>
                ) : (
               <EditIcon onClick={this.saveUser} />
                 )}
                </TableRowColumn>

                <TableRowColumn>
                <TrashIcon onClick={this.handleRemoveUser} />
                </TableRowColumn>
            </TableRow>
            </MuiThemeProvider>
        )
    }
}

PersonRow.propTypes = {
    data: React.PropTypes.object.isRequired,
    deleteUser: React.PropTypes.func.isRequired,
    addFlashMessage:React.PropTypes.func.isRequired,
    
}

export default PersonRow;