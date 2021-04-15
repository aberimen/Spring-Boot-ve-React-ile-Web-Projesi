import React from 'react';
import HomePage from "../pages/HomePage";
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserPage from "../pages/UserPage";
import SignUpPage from "../pages/SignUpPage";
import Navbar from "../components/Navbar";
import LogInPage from "../pages/LogInPage";



class App extends React.Component {

  state = {
    isLoggedIn: false, username: 'user'
  };

  onLoginSuccess = username => {
    this.setState({
      username,
      isLoggedIn: true
    });
  }

  onLogoutSuccess = () => {
    this.setState({
      username : undefined,
      isLoggedIn: false
    });
  }

  render() {
    const { isLoggedIn, username } = this.state;
    return (
      <div>
        <Router>
          <Navbar isLoggedIn={isLoggedIn} username={username} onLogoutSuccess = {this.onLogoutSuccess}/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && (
              <Route path="/login" component={(props) => {
                return <LogInPage {...props} onLoginSuccess={this.onLoginSuccess} />
              }} />
            )}
            <Route path="/signup" component={SignUpPage} />
            <Route path="/user/:username" component={props =>{
              return <UserPage {...props} loggedInUsername = {username}/>
            }} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
