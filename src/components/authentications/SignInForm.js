import React from "react";
import { withRouter } from "react-router-dom";
import { compose, withHandlers } from "recompose";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

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
  ({ classes, onSignInClick, handleNavigateTo, handleGuestMode }) => (
    <form onSubmit={onSignInClick}>
      <div className="form-group">
        <TextField
          className="w-100 mb-0"
          label="Email address"
          name="email"
          style={{ paddingBottom: "1rem", color: "#424242" }}
          InputProps={{
            className: classes.input,
            style: { borderBottom: "1px solid #424242" }
          }}
          InputLabelProps={{
            className: classes.textFieldFormLabel
          }}
          autoComplete="username email"
        />
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
          InputProps={{
            className: classes.input,
            style: { borderBottom: "1px solid #424242" }
          }}
          InputLabelProps={{
            className: classes.textFieldFormLabel
          }}
        />
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
        <button className="btn border border-dark" type="submit">
          sign in
        </button>
        <a
          className="btn text-dark border border-dark"
          onClick={handleNavigateTo("/sign_up")}
        >
          sign up
        </a>
        <a
          className="btn text-dark border border-dark"
          onClick={handleGuestMode}
        >
          Guest mode
        </a>
      </div>
    </form>
  )
);

export default SignInForm;
