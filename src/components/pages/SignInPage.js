import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signInUser } from "../../actions/userAction";
import { getAllFormInput } from "../../_helpers/formHelper.js";

import Loader from "react-loader-spinner";
import SignInForm from "../authentications/SignInForm";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user,
    pendingSignIn: state.userReducer.pendingSignIn,
    signedIn: state.userReducer.signedIn
  };
};

const SignInPage = props => {
  const { pendingSignIn, signedIn } = props;
  const handleSignIn = e => {
    e.preventDefault();
    const userInput = getAllFormInput(e.currentTarget);
    props.dispatch(signInUser(userInput));
  };

  const handleGuestMode = e => {
    e.preventDefault();
    const guest = {
      email: "guest@shalleat.com",
      password: "guest1!2@"
    };
    props.dispatch(signInUser(guest));
  };
  const SwitchComponent = () => {
    switch (true) {
      case pendingSignIn:
        return (
          <Loader type="TailSpin" color="#00BFFF" height="100" width="100" />
        );
      case signedIn:
        return (
          <div className="SignInPage d-flex flex-column justify-content-center align-items-center w-100">
            Signed In!
          </div>
        );

      default:
        return (
          <div>
            <h1 className="display-4 auth-title mb-4">Sign In</h1>
            <SignInForm
              onSignInClick={handleSignIn}
              onGuestModeClick={handleGuestMode}
              // thirdPartySignIn={thirdPartySignIn}
              // updateThirdPartySignIn={updateThirdPartySignIn}
            />
          </div>
        );
    }
  };
  return (
    <div
      className="SignInPage d-flex flex-column justify-content-center align-items-center w-100"
      style={{ height: "94vh" }}
    >
      <div
        className="SignInMethods shadow-sm bg-white rounded"
        style={{
          width: "450px",
          height: "448px",
          minHeight: "390px",
          padding: "48px 40px"
        }}
      >
        <SwitchComponent />
      </div>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(SignInPage));
