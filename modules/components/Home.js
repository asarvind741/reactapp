import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Home extends Component {
   render() {
      return (
        <Card className="container">
        <CardTitle title="React Application" subtitle="This is the home page." />
        </Card>
      );
   }
}
export default Home;