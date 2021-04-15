import HomePage from "../pages/HomePage";
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserPage from "../pages/UserPage";
import SignUpPage from "../pages/SignUpPage";
import Navbar from "../components/Navbar";
import LogInPage from "../pages/LogInPage";


function App() {
  return (

    <div>

      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/user/:username" component={UserPage} />
          <Route path="/login" component={LogInPage} />
          <Route path="/signup" component={SignUpPage} />
          <Redirect to="/" />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
