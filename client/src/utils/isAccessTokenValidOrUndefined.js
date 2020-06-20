import jwtDecode from "jwt-decode";

function isAccessTokenValidOrUndefined(accessToken) {
  if (!accessToken) {
    return true;
  }

  try {
    const { exp } = jwtDecode(accessToken);

    // exp represents the time when the token expires in seconds.
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
}

export default isAccessTokenValidOrUndefined;
