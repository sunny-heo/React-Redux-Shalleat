import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import "../styles/css/App.css";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user,
    pendingSignIn: state.userReducer.pendingSignIn,
    signedIn: state.userReducer.signedIn
  };
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignInPage />
        {/* <SignUpPage /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
