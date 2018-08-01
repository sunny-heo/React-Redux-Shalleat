import React from "react";
import { compose, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { GOOGLE } from "../../../_config/authConfig";

import { oAuthSignIn } from "../../../actions/userAction";

import Icon from "../../common/Icon";

const {
  domain,
  scope,
  accessType,
  clientId,
  redirectURL,
  responseType
} = GOOGLE;

const href = `${domain}?scope=${scope}&access_type=${accessType}&redirect_uri=${redirectURL}&response_type=${responseType}&client_id=${clientId}`;

const styles = {
  GoogleSignIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8 * 3,
    boxShadow:
      "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2) "
  },
  goolgeOAuthLink: {
    textDecoration: "none !important"
  },
  googleIcon: {
    fill: "#ff5433",
    borderBottomLeftRadius: "2px",
    borderTopLeftRadius: "2px"
  }
};
const enhance = compose(
  withStyles(styles),
  withHandlers({
    handleSignIn: props => evt => {
      evt.preventDefault();
      oAuthSignIn("google")(props.dispatch);
    }
  })
);

const GoogleSignIn = enhance(props => {
  const { classes } = props;
  return (
    <a href={href} className={classes.goolgeOAuthLink}>
      <div className={classes.GoogleSignIn}>
        <Icon
          icon="google"
          width="48px"
          height="48px"
          style={styles.googleIcon}
        />
        <span className="h4 mx-auto mb-0 text-white">Sign in with Google</span>
      </div>
    </a>
  );
});

export default GoogleSignIn;
