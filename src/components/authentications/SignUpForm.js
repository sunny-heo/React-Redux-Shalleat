import React from "react";
import { TextField } from "rmwc/TextField";

const SignUpForm = ({ onSignUpClick }) => (
  <div
    className="SignUpForm shadow-sm bg-white rounded"
    style={{
      width: "450px",
      height: "auto",
      minHeight: "390px",
      padding: "48px 40px"
    }}
  >
    <h1 className="display-4 auth-title">Sign Up</h1>
    <form onSubmit={onSignUpClick}>
      <div className="form-group">
        <div className="form-row">
          <div className="col">
            <TextField
              className="w-100 my-0"
              label="Frist Name"
              name="firstName"
              style={{ paddingBottom: "1rem" }}
              autoComplete="given-name"
            />
          </div>
          <div className="col">
            <TextField
              className="w-100 my-0"
              label="Last Name"
              name="lastName"
              style={{ paddingBottom: "1rem" }}
              autoComplete="family-name"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <TextField
          className="w-100 my-0"
          label="Email address"
          name="email"
          style={{ paddingBottom: "1rem" }}
          autoComplete="username email"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
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
        <small id="passwordHelpBlock" className="form-text text-muted">
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </small>
      </div>
      <div className="form-group">
        <TextField
          className="w-100 my-0"
          label="Password"
          name="pwMatch"
          type="password"
          autoComplete="new-password"
          style={{ paddingBottom: "1rem" }}
        />
      </div>
      <button
        className="btn btn-secondary text-capitalize"
        type="submit"
        style={{ marginTop: "2rem" }}
      >
        sign up
      </button>
    </form>
  </div>
);

export default SignUpForm;
