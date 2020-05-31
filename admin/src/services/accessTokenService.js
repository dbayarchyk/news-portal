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
    return process.browser
      ? inMemoryToken
      : this.serverSession.serverAccessToken;
  }
}

export default AccessTokenService;
