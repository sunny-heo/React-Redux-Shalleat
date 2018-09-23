import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getUserLocation } from "../actions/userAction";

import { Navbar } from "./Headers";
import { AuthRoute } from "./authentications";
import {
  SignInPage,
  SignUpPage,
  OAuthPage,
  SearchPage,
  MapPage,
  NoMatchPage
} from "./pages";

import "../styles/css/App.css";

const mapStateToProps = (state, nextOwnProps) => state;
const mapDispatchToProps = dispatch => {
  return {
    getLocation: async () => {
      try {
        await dispatch(getUserLocation());
      } catch (error) {
        console.log(error);
      }
    }
  };
};

class App extends Component {
  componentDidMount() {
    const { user, getLocation } = this.props;
    !user.location && getLocation();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <AuthRoute exact path="/" component={SearchPage} />
            <AuthRoute exact path="/map" component={MapPage} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
