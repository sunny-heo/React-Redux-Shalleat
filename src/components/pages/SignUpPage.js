import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signUpUser } from "../../actions/userAction";
import { getAllFormInput } from "../../_helpers/_formHelper";

import Loader from "react-loader-spinner";
import SignUpForm from "../authentications/SignUpForm";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    pendingSignUp: state.user.pendingSignUp,
    signedIn: state.user.signedIn,
    signedUp: state.user.signedUp
  };
};

const SignUpPage = props => {
  const { pendingSignUp, signedIn, signedUp } = props;
  const handleSignUp = e => {
    e.preventDefault();
    const userInput = getAllFormInput(e.currentTarget);
    props.dispatch(signUpUser(userInput));
  };

  const SwitchComponent = () => {
    switch (true) {
      case pendingSignUp:
        return (
          <Loader type="TailSpin" color="#00BFFF" height="100" width="100" />
        );

      case signedIn:
      case signedUp:
        return <Redirect to="/" />;

      default:
        return (
          <div className="SignUpPage d-flex flex-column justify-content-center align-items-center w-100">
            <SignUpForm onSignUpClick={handleSignUp} />
          </div>
        );
    }
  };

  return (
    <div
      className="SignUpPage d-flex flex-column justify-content-center align-items-center w-100"
      style={{ height: "94vh" }}
    >
      <SwitchComponent />
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(SignUpPage));
