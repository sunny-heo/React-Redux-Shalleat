import React from "react";
import { compose, withHandlers } from "recompose";

import { guest, getAllFormInput } from "../../_helpers/index";
import { signInUser } from "../../actions/userAction";

import AuthPending from "./AuthPending";
import SignInForm from "./SignInForm";

const enhance = compose(
  withHandlers({
    handleSignIn: props => evt => {
      evt.preventDefault();
      const userInput = getAllFormInput(evt.currentTarget);
      signInUser(userInput)(props.dispatch);
    },
    handleGuestMode: props => evt => {
      evt.preventDefault();
      signInUser(guest)(props.dispatch);
    }
  })
);

const SwitchComponent = enhance(
  ({ pendingSignIn, signedIn, handleSignIn, handleGuestMode }) => {
    switch (true) {
      case pendingSignIn:
        return <AuthPending />;
      case signedIn:
        return (
          <div className="SignInPage d-flex flex-column justify-content-center align-items-center w-100">
            Signed In!
          </div>
        );

      default:
        return (
          <SignInForm
            onSignInClick={handleSignIn}
            onGuestModeClick={handleGuestMode}
          />
        );
    }
  }
);

const LocalSignIn = props => (
  <div>
    <h1 className="display-4 auth-title mb-4 text-white">ShallEat Account</h1>
    <SwitchComponent {...props} />
  </div>
);
export default LocalSignIn;
