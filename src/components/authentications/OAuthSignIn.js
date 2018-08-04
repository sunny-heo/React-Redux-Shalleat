import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import GoogleSignIn from "./oAuthSignIn/GoogleSignIn";

const styles = theme => {
  return {
    OAuthSignIn: {
      color: "#424242",
      marginBottom: 8 * 3,
      fontSize: "2.125rem",
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: 1.176471
    }
  };
};

const enhance = compose(withStyles(styles));

const OAuthSignIn = enhance(props => {
  const { classes, ...restProps } = props;
  return (
    <div className="OAuthSignIn">
      <h1 className={classes.OAuthSignIn}>Social Account</h1>
      <GoogleSignIn {...restProps} />
    </div>
  );
});

export default OAuthSignIn;
