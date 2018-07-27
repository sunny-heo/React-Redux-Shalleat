import React from "react";
import { connect } from "react-redux";
import { signInUser } from "../../actions/userAction";
import { getAllFormInput } from "../../_helpers/formHelper.js";

import SignInForm from "../forms/SignInForm";

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

  switch (true) {
    case pendingSignIn:
      return <div>pending</div>;

    case signedIn:
      return (
        <div className="SignInPage d-flex flex-column justify-content-center align-items-center w-100">
          Signed In!
        </div>
      );

    default:
      return (
        <div className="SignInPage d-flex flex-column justify-content-center align-items-center w-100">
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

export default connect(mapStateToProps)(SignInPage);
