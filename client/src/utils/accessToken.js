let inMemoryAccessToken = null;

export function setInMemoryAccessToken(newAccessToken) {
  if (!process.browser) {
    throw new Error("Can not set inMemoryAccessToken in the SSR mode.");
  }

  inMemoryAccessToken = newAccessToken;
}

export function getAccessToken(serverSession) {
  if (!process.browser) {
    return serverSession ? serverSession.serverAccessToken : null;
  }

  return inMemoryAccessToken;
}
