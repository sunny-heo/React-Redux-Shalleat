export const GOOGLE = {
  domain: "https://accounts.google.com/o/oauth2/v2/auth",
  scope:
    "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile",
  accessType: "online",
  clientId:
    "648697180446-j8hrcvmuu8avoiferc473fcc821elrll.apps.googleusercontent.com",
  // redirectURL: "https://www.shalleat.com/auth/google",
  redirectURL: "http://localhost:3001/auth/google",
  responseType: "token"
};

export const FACEBOOK = {
  domain: "https://www.facebook.com/v3.0/dialog/oauth",
  clientId: "287954711742714",
  redirectURL: "https://www.shalleat.com/auth/facebook",
  responseType: "token"
};
