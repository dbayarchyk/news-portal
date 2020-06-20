import { stores } from "@sapper/app";

import isAccessTokenValidOrUndefined from "./isAccessTokenValidOrUndefined";
import extendHeadersWithAuthToken from "./extendHeadersWithAuthToken";
import deriveSessionFromAccessToken from "./deriveSessionFromAccessToken";
import { refresh } from "./auth";

function extendFetchWithAuth(originalFetch, session) {
  return async function extendedFetchWithAuth(url, options = {}) {
    let accessToken = session.accessToken;

    if (!isAccessTokenValidOrUndefined(accessToken)) {
      try {
        accessToken = await refresh(originalFetch);
      } catch {
        accessToken = null;
      }

      if (process.browser) {
        const { session: sessionStore } = stores();

        sessionStore.update((oldSession) => ({
          ...oldSession,
          ...deriveSessionFromAccessToken(accessToken),
        }));
      }
    }

    const extendedOptions = {
      ...options,
      headers: extendHeadersWithAuthToken(options.headers, accessToken),
    };

    return originalFetch(url, extendedOptions);
  };
}

export default extendFetchWithAuth;
