import React from "react";

import GoogleSignIn from "./oAuthSignIn/GoogleSignIn";

const OAuthSignIn = () => (
  <div className="OAuthSignIn">
    <h1 className="display-4 auth-title mb-4 text-white">Social Account</h1>
    <GoogleSignIn />
  </div>
);
export default OAuthSignIn;
