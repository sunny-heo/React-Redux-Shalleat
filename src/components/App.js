import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Headers/Navbar";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NoMatchPage from "./pages/NoMatchPage";

import "../styles/css/App.css";

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    pendingSignIn: state.userReducer.pendingSignIn,
    signedIn: state.userReducer.signedIn
  };
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/sign_in" component={SignInPage} />
            <Route exact path="/sign_up" component={SignUpPage} />
            <Route component={NoMatchPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
