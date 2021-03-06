import React from 'react';
import Home from './../home';
import Admin from './../admin';
import Username from './../username';
import Login from './../login';
import Update from './../update';
import Result from './../result';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <h3><a href="/">Home</a></h3>
            <ul>
              <li>
                <Link to="/socialcybersecurity">Social Cybersecurity Home</Link>
              </li>
              <li>
                <Link to="/socialcybersecurity/admin">Admin Only</Link>
              </li>
              <li>
                <Link to="/socialcybersecurity/login">Login</Link>
              </li>
              <li>
                <Link to="/socialcybersecurity/update">Update Notes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/socialcybersecurity/admin">
              <Admin />
            </Route>
            <Route path="/socialcybersecurity/login">
              <Username />
            </Route>
            <Route path="/socialcybersecurity/login-questions">
              <Login />
            </Route>
            <Route path="/socialcybersecurity/update">
              <Update />
            </Route>
            <Route path="/socialcybersecurity/result">
              <Result />
            </Route>
            <Route path="/socialcybersecurity">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navbar;
