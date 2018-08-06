import React from "react";
import { withRouter } from "react-router-dom";
import { compose, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Btn from "../common/Button";

const styles = {
  input: {
    color: "#424242"
  },
  textFieldFormLabel: {
    color: "#424242"
  }
};
const enhance = compose(
  withRouter,
  withStyles(styles),
  withHandlers({
    handleNavigateTo: props => path => evt => {
      evt.preventDefault();
      props.history.push(path);
    }
  })
);

const SignInForm = enhance(
  ({
    classes,
    onSignInClick,
    handleNavigateTo,
    handleGuestMode,
    validEmail,
    validPassword
  }) => (
    <form onSubmit={onSignInClick}>
      <div className="form-group">
        <TextField
          className="w-100 mb-0"
          label="Email address"
          name="email"
          style={{ paddingBottom: "1rem", color: "#424242" }}
          autoComplete="username email"
        />
        <span
          style={
            validEmail
              ? { display: "none" }
              : { display: "block", color: "red" }
          }
        >
          Please provide Email.
        </span>
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <a
          className="text-dark disabled"
          htmlFor="findEmail"
          style={{
            cursor: "not-allowed",
            opacity: "0.5",
            textDecoration: "none"
          }}
        >
          Forgot email?
        </a>
      </div>
      <div className="form-group">
        <TextField
          className="w-100 my-0"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          style={{ paddingBottom: "1rem" }}
        />
        <span
          style={
            validPassword
              ? { display: "none" }
              : { display: "block", color: "red" }
          }
        >
          Please provide password.
        </span>
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <a
          className="text-dark disabled"
          htmlFor="findPassword"
          style={{
            cursor: "not-allowed",
            opacity: "0.5",
            textDecoration: "none"
          }}
        >
          Forgot password?
        </a>
      </div>
      <div
        className="d-flex justify-content-between align-items-center flex-wrap"
        style={{ marginTop: "2rem" }}
      >
        <Btn name="Sign in" type="submit" />
        <Btn name="Sign up" onClick={handleNavigateTo("/sign_up")} />
        <Btn name="Guest mode" onClick={handleGuestMode} />
      </div>
    </form>
  )
);

export default SignInForm;
