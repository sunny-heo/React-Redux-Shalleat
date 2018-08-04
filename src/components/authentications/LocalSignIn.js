import React from "react";
import { Redirect } from "react-router-dom";
import { compose, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import { guest, getAllFormInput } from "../../_helpers";
import { signInUser } from "../../actions/userAction";

import AuthPending from "../pendings/AuthPending";
import SignInForm from "./SignInForm";

const styles = theme => {
  return {
    LocalSignIn: {
      color: "#424242",
      marginBottom: 8 * 3,
      fontSize: "2.125rem",
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: 1.176471
    }
  };
};

const enhance = compose(
  withStyles(styles),
  withHandlers({
    handleSignIn: props => evt => {
      evt.preventDefault();
      const userInput = getAllFormInput(evt.currentTarget);
      props.dispatch(signInUser(userInput));
    },
    handleGuestMode: props => evt => {
      evt.preventDefault();
      props.dispatch(signInUser(guest));
    }
  })
);

const SwitchComponent = enhance(
  ({ pendingSignIn, signedIn, handleSignIn, handleGuestMode }) => {
    switch (true) {
      case pendingSignIn:
        return <AuthPending />;
      case signedIn:
        return <Redirect exact to="/" />;

      default:
        return (
          <SignInForm
            onSignInClick={handleSignIn}
            handleGuestMode={handleGuestMode}
          />
        );
    }
  }
);

const LocalSignIn = enhance(props => {
  const { classes, ...restProps } = props;
  return (
    <div className="LocalSignIn">
      <h1 className={classes.LocalSignIn}>ShallEat Account</h1>
      <SwitchComponent {...restProps} />
    </div>
  );
});
export default LocalSignIn;
