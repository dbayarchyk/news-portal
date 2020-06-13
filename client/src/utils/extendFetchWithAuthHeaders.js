import { getAccessToken } from "./accessToken";

function extendFetchWithAuthHeaders(originalFetch, serverSession) {
  return function extendedFetchWithAuthHeaders(url, options = {}) {
    const accessToken = getAccessToken(serverSession);
    const extendedOptions = {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };

    return originalFetch(url, extendedOptions);
  };
}

export default extendFetchWithAuthHeaders;
