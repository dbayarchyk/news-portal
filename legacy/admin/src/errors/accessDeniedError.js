class AccessDeniedError extends Error {
  constructor() {
    super("Access is denied.");
  }
}

export default AccessDeniedError;
