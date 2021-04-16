import React from 'react';
import HomePage from "../pages/HomePage";
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserPage from "../pages/UserPage";
import SignUpPage from "../pages/SignUpPage";
import Navbar from "../components/Navbar";
import LogInPage from "../pages/LogInPage";
//import { Authentication } from "../shared/AuthenticationContext";
import { connect } from 'react-redux';



class App extends React.Component {

  //static contextType = Authentication;

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && (
              <Route path="/login" component={LogInPage} />
            )}
            <Route path="/signup" component={SignUpPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }

}

const mapStateToProps = store => {
  return { isLoggedIn: store.isLoggedIn };
}

export default connect(mapStateToProps)(App);
