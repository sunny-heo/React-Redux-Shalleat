import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";

const mapStateToProps = (state, nextOwnProps) => state.userReducer;
const enhance = compose(connect(mapStateToProps));

const AuthRoute = enhance(
  ({ component: Component, render, signedIn, ...restProps }) => {
    if (signedIn) {
      if (typeof render === "function") return render(restProps);
      else return <Component {...restProps} />;
    }
    return <Redirect exact to="/sign_in" />;
  }
);

export default AuthRoute;
