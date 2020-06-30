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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/update">Update Notes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/update">
              <Update />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default Navbar;
