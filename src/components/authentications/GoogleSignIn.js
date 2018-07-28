import React from "react";
import { GOOGLE } from "../../_config/authConfig";

import Icon from "../common/Icon";

const {
  domain,
  scope,
  accessType,
  clientId,
  redirectURL,
  responseType
} = GOOGLE;
// const domain = "https://accounts.google.com/o/oauth2/v2/auth";
// const scope =
//   "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile";
// const accessType = "online";
// const clientId =
//   "648697180446-j8hrcvmuu8avoiferc473fcc821elrll.apps.googleusercontent.com";
// const redirectURL = "https://www.shalleat.com/auth/google";
// const responseType = "token";

const GoogleSignIn = () => {
  return (
    <a
      href={`${domain}?scope=${scope}&access_type=${accessType}&redirect_uri=${redirectURL}&response_type=${responseType}&client_id=${clientId}`}
      style={{ textDecoration: "none" }}
    >
      <div className="d-flex align-items-center shadow-sm bg-white rounded mb-4">
        <Icon
          icon="google"
          width="48px"
          height="48px"
          style={{
            fill: "#8bc34a",
            borderBottomLeftRadius: "2px",
            borderTopLeftRadius: "2px"
          }}
        />
        <span className="h4 mx-auto mb-0 text-dark">Sign in with Google</span>
      </div>
    </a>
  );
};

export default GoogleSignIn;
