import jwtDecode from "jwt-decode";

let inMemoryToken = null;

class AccessTokenService {
  constructor(serverSession) {
    this.serverSession = serverSession || {};
  }

  setInMemoryToken(newToken) {
    if (!process.browser) {
      throw new Error("inMemoryToken can not be set in the SSR mode.");
    }

    inMemoryToken = newToken;
  }

  getToken() {
    if (!process.browser) {
      return this.serverSession.serverAccessToken;
    }

    return inMemoryToken;
  }

  getTokenPayload() {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    return jwtDecode(token);
  }
}

export default AccessTokenService;
