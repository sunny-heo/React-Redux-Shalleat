import React from "react";
import { TextField } from "rmwc/TextField";

const SignInForm = ({
  onSignInClick,
  onGuestModeClick
  // thirdPartySignIn,
  // updateThirdPartySignIn
}) => (
  <form onSubmit={onSignInClick}>
    <div className="form-group">
      <TextField
        className="w-100 mb-0"
        label="Email address"
        name="email"
        style={{ paddingBottom: "1rem" }}
        autoComplete="username email"
      />
    </div>
    <div className="d-flex justify-content-end align-items-center">
      <a
        className="text-info disabled"
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
      {/* <div className="floating-label">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            aria-describedby="passwordHelp"
            className="form-control"
            id="password"
            type="password"
            autoComplete="current-password"
          />
        </div> */}
    </div>
    <div className="d-flex justify-content-end align-items-center">
      <a
        className="text-info disabled"
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
      {/* <Button
          class="btn btn-secondary text-capitalize"
          name="sign in"
          type="submit"
        /> */}
      <button className="btn btn-secondary text-capitalize" type="submit">
        sign in
      </button>
      <a
        href=""
        className="text-info"
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
);

export default SignInForm;
