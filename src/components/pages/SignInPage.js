import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
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
const mapStateToProps = (state, nextOwnProps) => state.userReducer;

const enhance = compose(
  connect(mapStateToProps),
  withStyles(styles)
);

const SignInPage = enhance(props => {
  const { classes, ...restProps } = props;
  return (
    <div className={classes.SignInPage}>
      <SignInHeader {...restProps} />
    </div>
  );
});

export default SignInPage;
