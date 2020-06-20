import jwtDecode from "jwt-decode";

function deriveCurrentUserFromAccessToken(accessToken) {
  if (!accessToken) {
    return null;
  }

  try {
    const accessTokenPayload = jwtDecode(accessToken);

    return {
      username: accessTokenPayload.username,
      id: accessTokenPayload.sub,
      permissions: accessTokenPayload.permissions || [],
      role: accessTokenPayload.role,
    };
  } catch {
    return null;
  }
}

export default deriveCurrentUserFromAccessToken;
