import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import Form from "./Form";
import Table from "./Table";

class Company extends Component {
constructor(props){
    super(props);
  this.state = {
    data: [],
    editIdx: -1
  };
  this.startEditing =this.startEditing.bind(this);
  this.stopEditing = this.stopEditing.bind(this);
  this.handleRemove = this.handleRemove.bind(this);
  this.handleChange = this.handleChange.bind(this);
    }
  handleRemove(i){
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing(i){
    this.setState({ editIdx: i });
  };

  stopEditing(){
    this.setState({ editIdx: -1 });
  };

  handleChange(e, name, i){
    const { value } = e.target;
    this.setState(state => ({
      data: state.data.map(
        (row, j) => (j === i ? { row, [name]: value } : row)
      )
    }));
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission]
              })}
          />
          <Table
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleChange={this.handleChange}
            data={this.state.data}
            header={[
              {
                name: "First name",
                prop: "firstName"
              },
              {
                name: "Last name",
                prop: "lastName"
              },
              {
                name: "Username",
                prop: "username"
              },
              {
                name: "Email",
                prop: "email"
              }
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Company;