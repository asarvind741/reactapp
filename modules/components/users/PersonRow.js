import React from 'react';

class PersonRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',

        }
        this.handleRemoveUser = this.handleRemoveUser.bind(this);

    }

    componentDidMount() {
        this.setState({ user: this.props.data });
        // console.log("state user list", this.state.user);
    }


    handleRemoveUser() {
        event.preventDefault();
        this.props.deleteUser(this.state.user).then((response)=>{
            console.log("response",response);
            if(response.status === 200){
                this.props.addFlashMessage({
                    type: 'success',
                    text: response.statusText
                })
            }
            else{
                this.props.addFlashMessage({
                    type: 'error',
                    text: response.statusText
                })
            }
        });
    }

    render() {
        const { deleteUser } = this.props.deleteUser;
        var that = this;
    //    console.log("props are",this.props);
        let row = this.state.user
        // console.log("row", row);
        return (
            <tr>
                <td>
                    {row.firstname}
                </td>
                <td>
                    {row.lastname}
                </td>
                <td>
                    {row.email}
                </td>
                <td>
                    <input type="button" className="btn btn-primary" value="Edit" /* onClick={this.handleRemoveUser} */ />
                </td>
                <td>
                    <input type="button" className="btn btn-danger" value="Remove" onClick={this.handleRemoveUser} />
                </td>
            </tr>
        )
    }
}

PersonRow.propTypes = {
    data: React.PropTypes.object.isRequired,
    deleteUser: React.PropTypes.func.isRequired,
    addFlashMessage:React.PropTypes.func.isRequired
}

export default PersonRow;