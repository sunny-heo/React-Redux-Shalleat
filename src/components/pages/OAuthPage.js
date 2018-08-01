import React from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { compose, withReducer, lifecycle } from "recompose";
import PropTypes from "prop-types";

import { googleSignInUser } from "../../actions/userAction";
import userReducer from "../../reducers/userReducer";

import AuthPending from "../authentications/AuthPending";

const styles = theme => {
  return {
    OAuthPage: {
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
  withReducer("state", "dispatch", userReducer),
  lifecycle({
    componentDidMount() {
      const url = window.location.href;
      const accessToken = url.match(/access_token=([^&]*)/)[1];

      googleSignInUser(accessToken)(this.props.dispatch);
    }
  })
);

const OAuthPage = enhance(({ state }) => {
  const { pendingSignIn, signedIn, error } = state;
  switch (true) {
    case pendingSignIn:
      return <AuthPending />;
    case signedIn:
      return <Redirect to="/sign_in" />;
    case error:
      return <div>{error}</div>;
    default:
      return <AuthPending />;
  }
});

OAuthPage.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default OAuthPage;
