function extendHeadersWithAuthToken(headers, accessToken) {
  const extendedHeaders = headers || {};

  if (!accessToken) {
    return extendedHeaders;
  }

  return {
    ...extendedHeaders,
    Authorization: `Bearer ${accessToken}`,
  };
}

export default extendHeadersWithAuthToken;
