import React from "react";
import { compose, withState, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import { guest, getAllFormInput } from "../../_helpers";
import { signInUser } from "../../actions/userAction";

import AuthPending from "../pendings/CircularPending";
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
  withState("validEmail", "setValidEmail", true),
  withState("validPassword", "setValidPassword", true),
  withHandlers({
    handleSignIn: props => evt => {
      evt.preventDefault();
      console.log("handleSignIn");
      const userInput = getAllFormInput(evt.currentTarget);
      const { setValidEmail, setValidPassword } = props;
      const validEmail = !!userInput.email;
      const validPassword = !!userInput.password;

      setValidEmail(validEmail);
      setValidPassword(validPassword);

      if (validEmail && validPassword) {
        props.dispatch(signInUser(userInput));
      }
    },
    handleGuestMode: props => evt => {
      evt.preventDefault();
      props.dispatch(signInUser(guest));
    }
  })
);

const SwitchComponent = enhance(({ pendingSignIn, ...restProps }) => {
  switch (true) {
    case pendingSignIn:
      return <AuthPending />;
    default:
      return <SignInForm {...restProps} />;
  }
});

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
