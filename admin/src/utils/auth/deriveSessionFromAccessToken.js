import deriveCurrentUserFromAccessToken from "./deriveCurrentUserFromAccessToken";

function deriveSessionFromAccessToken(accessToken) {
  return {
    accessToken: accessToken,
    currentUser: deriveCurrentUserFromAccessToken(accessToken),
  };
}

export default deriveSessionFromAccessToken;
