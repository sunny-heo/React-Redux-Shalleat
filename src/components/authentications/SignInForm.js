import React from "react";
import { compose } from "recompose";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const styles = {
  root: {
    background: "black"
  },
  input: {
    color: "white"
  },
  textFieldFormLabel: {
    color: "white"
  }
};
const enhance = compose(withStyles(styles));

const SignInForm = enhance(({ classes, onSignInClick, onGuestModeClick }) => (
  <form onSubmit={onSignInClick}>
    <div className="form-group">
      <TextField
        className="w-100 mb-0"
        label="Email address"
        name="email"
        style={{ paddingBottom: "1rem", color: "white" }}
        InputProps={{
          className: classes.input
        }}
        InputLabelProps={{
          className: classes.textFieldFormLabel
        }}
        autoComplete="username email"
      />
    </div>
    <div className="d-flex justify-content-end align-items-center">
      <a
        className="text-white disabled"
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
        InputProps={{
          className: classes.input
        }}
        InputLabelProps={{
          className: classes.textFieldFormLabel
        }}
      />
    </div>
    <div className="d-flex justify-content-end align-items-center">
      <a
        className="text-white disabled"
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
      <Button className="btn btn-secondary text-capitalize" type="submit">
        sign in
      </Button>
      <a
        href=""
        className="text-white"
        htmlFor="triggerGuestMode"
        onClick={onGuestModeClick}
        // style={isMobile ? { marginTop: "1rem" } : {}}
      >
        Don't wanna sign in? Use Guest mode.
      </a>
      {/* <button
          className="btn btn-info text-capitalize mt-3 ml-auto"
          onClick={e => {
            e.preventDefault();
            updateThirdPartySignIn(!thirdPartySignIn);
          }}
        >
          Go Back
        </button> */}
    </div>
  </form>
));

export default SignInForm;
