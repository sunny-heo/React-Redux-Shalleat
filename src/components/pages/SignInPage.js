import React from "react";
import { compose, withReducer } from "recompose";
import { withRouter } from "react-router-dom";

import userReducer from "../../reducers/userReducer";
import { withStyles } from "@material-ui/core/styles";

import SignInHeader from "../Headers/SignInHeader";

const styles = theme => {
  return {
    SignInMethod: {
      background: "linear-gradient(to right, #5433ff, #20bdff);"
    }
  };
};

const enhance = compose(
  withStyles(styles),
  withReducer("state", "dispatch", userReducer)
);
const SignInPage = enhance(props => (
  <div
    className="SignInPage d-flex justify-content-center align-items-center w-100"
    style={{ height: "94vh" }}
  >
    <div
      className={
        props.classes.SignInMethod + " SignInMethods shadow-sm bg-white rounded"
      }
      style={{
        width: "450px",
        maxWidth: "100%",
        height: "448px",
        minHeight: "390px"
      }}
    >
      <SignInHeader {...props} />
    </div>
  </div>
));
export default withRouter(SignInPage);
