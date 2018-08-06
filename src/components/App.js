import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getUserLocation } from "../actions/userAction";

import Navbar from "./Headers/Navbar";
import AuthRoute from "./authentications/AuthRoute";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import OAuthPage from "./pages/OAuthPage";
import MapPage from "./pages/MapPage";
import NoMatchPage from "./pages/NoMatchPage";

import "../styles/css/App.css";

const mapStateToProps = (state, nextOwnProps) => state;

class App extends Component {
  componentDidMount() {
    if (!this.props.user.location) this.props.dispatch(getUserLocation());
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <AuthRoute exact path="/" component={MapPage} />
            <Route exact path="/sign_in" component={SignInPage} />}
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
