import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { compose, lifecycle } from "recompose";

import { googleSignInUser } from "../../actions/userAction";

import { CircularPending } from "../utils";

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
const mapStateToProps = (state, nextOwnProps) => state.user;

const enhance = compose(
  connect(mapStateToProps),
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      const url = window.location.href;
      const accessToken = url.match(/access_token=([^&]*)/)[1];
      this.props.dispatch(googleSignInUser(accessToken));
    }
  })
);

const OAuthPage = enhance(props => {
  const { pendingSignIn, signedIn, error } = props;
  switch (true) {
    case pendingSignIn:
      return <CircularPending />;
    case signedIn:
      return <Redirect to="/sign_in" />;
    case error:
      return <div>{error}</div>;
    default:
      return null;
  }
});

export default OAuthPage;
