import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";

const mapStateToProps = (state, nextOwnProps) => state.user;
const enhance = compose(connect(mapStateToProps));
// const enhance = compose();

const AuthRoute = enhance(
  ({ component: Component, render, something, signedIn, ...restProps }) => {
    if (signedIn) {
      if (typeof render === "function") return render(restProps);
      else return <Component />;
    } else {
      return <Redirect exact to="/sign_in" />;
    }
  }
);

export default AuthRoute;
