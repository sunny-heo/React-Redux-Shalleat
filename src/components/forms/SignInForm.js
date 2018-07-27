import React from "react";
import { fetchUser } from "../../actions/userAction";
// import { isMobile } from "react-device-detect";
// import { Button } from "../common/Buttons";

const SignInForm = ({
  onSignInClick,
  onGuestModeClick
  // thirdPartySignIn,
  // updateThirdPartySignIn
}) => (
  <div>
    <form onSubmit={onSignInClick}>
      <div className="form-group">
        <div className="floating-label">
          <label htmlFor="email">Email address</label>
          <input
            name="email"
            aria-describedby="emailHelp"
            className="form-control"
            id="email"
            placeholder="sunny@shalleat.com"
            type="text"
            autoComplete="username email"
          />
        </div>
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
        <div className="floating-label">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            aria-describedby="passwordHelp"
            className="form-control"
            id="password"
            type="password"
            autoComplete="current-password"
          />
        </div>
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
  </div>
);

export default SignInForm;
