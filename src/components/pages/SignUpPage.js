import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/userAction";
import { getAllFormInput } from "../../_helpers/formHelper.js";

import Loader from "react-loader-spinner";
import SignUpForm from "../forms/SignUpForm";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user,
    pendingSignUp: state.userReducer.pendingSignUp,
    signedUp: state.userReducer.signedUp
  };
};

const SignUpPage = props => {
  const { pendingSignUp, signedUp } = props;

  const handleSignUp = e => {
    e.preventDefault();
    const userInput = getAllFormInput(e.currentTarget);
    props.dispatch(signUpUser(userInput));
  };

  switch (true) {
    case pendingSignUp:
      return (
        <Loader type="TailSpin" color="#00BFFF" height="100" width="100" />
      );

    case signedUp:
      return (
        <div className="SignUpPage d-flex flex-column justify-content-center align-items-center w-100">
          Signed In!
        </div>
      );

    default:
      return (
        <div className="SignUpPage d-flex flex-column justify-content-center align-items-center w-100">
          <SignUpForm onSignUpClick={handleSignUp} />
        </div>
      );
  }
};

export default withRouter(connect(mapStateToProps)(SignUpPage));
