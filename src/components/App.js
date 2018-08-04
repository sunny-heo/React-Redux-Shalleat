import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getUserLocation } from "../actions/userAction";

import Navbar from "./Headers/Navbar";
import AuthRoute from "./authentications/AuthRoute";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OAuthPage from "./pages/OAuthPage";
import NoMatchPage from "./pages/NoMatchPage";

import "../styles/css/App.css";

const mapStateToProps = (state, nextOwnProps) => state;

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getUserLocation());
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <AuthRoute exact path="/" render={() => <div>Hi</div>} />
            <Route exact path="/sign_in" component={SignInPage} />
            <Route exact path="/sign_up" component={SignUpPage} />
            <Route path="/auth" component={OAuthPage} />
            <Route component={NoMatchPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
