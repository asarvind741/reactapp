import React from 'react';
import EditIcon from "material-ui/svg-icons/image/edit";
import TrashIcon from "material-ui/svg-icons/action/delete";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import TextField from "material-ui/TextField";
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import updateUserNow from '../actions/TableActions';

class PersonRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userslist:'',
            isEditing:true
        }
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
        console.log(event.target.value);
        updateUserNow(event)
        
    }

    render() {
        let row = this.state.user;
        const isEditing = this.state.isEditing;
        console.log("prps=====", this.props);
        return (
            <MuiThemeProvider>
            <TableRow>
                <TableRowColumn>{ isEditing ? ( <TextField name = {row.firstname} onChange = {this.updateUser} />):
                ( row.firstname)
                }
                </TableRowColumn>
                <TableRowColumn>
                    { isEditing ? ( <TextField name = {row.lastname} value = {row.lastname}/>):
                ( row.lastname)
                }</TableRowColumn>
                <TableRowColumn>
                    { isEditing ? ( <TextField name = {row.email} value = {row.email}/>):
                ( row.email)
                }</TableRowColumn>
                <TableRowColumn>
                { isEditing ? (
                <EditIcon onClick={this.handleEditUser}/>
                ) : (
               <CheckIcon onClick={this.saveUser} />
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