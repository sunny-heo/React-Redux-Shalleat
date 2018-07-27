import React, { Component } from "react";
import { connect } from "react-redux";
import service from "../_requests/AxiosService";
import { signInUser } from "../actions/userAction";
import SignInPage from "./pages/SignInPage";
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
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
