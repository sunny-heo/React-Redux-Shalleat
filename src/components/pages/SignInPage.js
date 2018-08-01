import React from "react";
import { compose, withReducer } from "recompose";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import userReducer from "../../reducers/userReducer";
import { withStyles } from "@material-ui/core/styles";

import SignInHeader from "../Headers/SignInHeader";

const styles = theme => {
  return {
    SignInPage: {
      width: "100%",
      height: "94vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  };
};

const enhance = compose(
  withStyles(styles),
  withReducer("state", "dispatch", userReducer)
);

const SignInPage = enhance(props => (
  <div className={props.classes.SignInPage}>
    <SignInHeader {...props} />
  </div>
));

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(SignInPage);
