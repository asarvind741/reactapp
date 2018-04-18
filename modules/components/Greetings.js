import React from 'react';
import { Component } from 'react';
import { Card, CardTitle,  CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './quiz/Main';
import LoginPage from './login/LoginPage';

class Greetings extends Component {
    
    renderDefaultQuiz(){
    return (
        <div>
        <MuiThemeProvider>
        <Card className="container">
            <CardTitle className="card-title" title="React Application" />
            <CardText>
                Please complete below Quiz and check Your level of knowledge here...
            </CardText>
        </Card>        
        </MuiThemeProvider>
         <MuiThemeProvider>
          <Card>
          <Main />
          </Card>
         </MuiThemeProvider>
         </div>
    );
}

renderNotLoggedIn(){
    return (
        <LoginPage />
    )
}

render() {
    const isLogged = localStorage.getItem('currentUser');
    return (
      <div className="App">
        {isLogged ? this.renderDefaultQuiz() : this.renderNotLoggedIn()}
      </div>
    );
  }

}

export default Greetings;