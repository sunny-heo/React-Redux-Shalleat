import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { FACEBOOK_HREF } from "../../../_config/myAuthConfig";

import Icon from "../../common/Icon";

const styles = {
  facebookSignIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8 * 3,
    borderRadius: "2px",
    boxShadow:
      "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
  },
  facebookOAuthLink: {
    textDecoration: "none !important"
  },
  facebookIcon: {
    fill: "#3b5998",
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
    <a href={FACEBOOK_HREF()} className={classes.facebookOAuthLink}>
      <div className={classes.facebookSignIn}>
        <Icon
          icon="facebook"
          width="48px"
          height="48px"
          style={styles.facebookIcon}
        />
        <span className={classes.oAuthSpan}>Sign in with Facebook</span>
      </div>
    </a>
  );
});

export default GoogleSignIn;
