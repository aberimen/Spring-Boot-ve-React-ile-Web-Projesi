import React from 'react';
import HomePage from "../pages/HomePage";
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserPage from "../pages/UserPage";
import SignUpPage from "../pages/SignUpPage";
import Navbar from "../components/Navbar";
import LogInPage from "../pages/LogInPage";
import { useSelector } from 'react-redux';



const App = props => {

  const { isLoggedIn } = useSelector((store) => { //isLoggedIn bilgisini hook kullanarak redux storeden alıyoruz
    return { isLoggedIn: store.isLoggedIn };
  });


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

export default App;
