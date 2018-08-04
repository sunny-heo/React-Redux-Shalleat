import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { GOOGLE_HREF } from "../../../_config/authConfig";

import Icon from "../../common/Icon";

const styles = {
  GoogleSignIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8 * 3,
    boxShadow:
      "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
  },
  goolgeOAuthLink: {
    textDecoration: "none !important"
  },
  googleIcon: {
    fill: "#ff5433",
    borderBottomLeftRadius: "2px",
    borderTopLeftRadius: "2px"
  },
  oAuthSpan: {
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: "1.25rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    lineHeight: 1.4,
    color: "#424242"
  }
};

const enhance = compose(withStyles(styles));
const GoogleSignIn = enhance(props => {
  const { classes } = props;
  return (
    <a href={GOOGLE_HREF()} className={classes.goolgeOAuthLink}>
      <div className={classes.GoogleSignIn}>
        <Icon
          icon="google"
          width="48px"
          height="48px"
          style={styles.googleIcon}
        />
        <span className={classes.oAuthSpan}>Sign in with Google</span>
      </div>
    </a>
  );
});

export default GoogleSignIn;
