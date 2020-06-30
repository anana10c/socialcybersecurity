import React from 'react';
import ReactDOM from 'react-dom';
import Home from './../home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Login() {
	return <h2>login</h2>;
}

function Update() {
	return <h2>update</h2>;
}

function Navbar() {
  return (
    <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/socialcybersecurity">Home</Link>
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
            <Route path="/socialcybersecurity/login">
              <Login />
            </Route>
            <Route path="/socialcybersecurity/update">
              <Update />
            </Route>
            <Route path="/socialcybersecurity">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default Navbar;
