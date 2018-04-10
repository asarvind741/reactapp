import React from 'react';
import { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Greetings extends Component {
    render(){
    return (
        <MuiThemeProvider>
        <Card className="container">
        <CardTitle title="React Application" subtitle="This is the home page." />
        </Card>
        </MuiThemeProvider>
    );
}
}

export default Greetings;