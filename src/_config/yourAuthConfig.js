const GOOGLE = {
  domain: "",
  scope: "",
  accessType: "",
  clientId: "",
  redirectURL: "",
  responseType: ""
};

const FACEBOOK = {
  domain: "",
  clientId: "",
  redirectURL: "",
  responseType: ""
};

export const GOOGLE_HREF = () => {
  const {
    domain,
    scope,
    accessType,
    clientId,
    redirectURL,
    responseType
  } = GOOGLE;

  return `${domain}?scope=${scope}&access_type=${accessType}&redirect_uri=${redirectURL}&response_type=${responseType}&client_id=${clientId}`;
};

export const FACEBOOK_HREF = () => {
  const { domain, clientId, redirectURL, responseType } = FACEBOOK;

  return `${domain}?client_id=${clientId}&redirect_uri=${redirectURL}&response_type=${responseType}`;
};
