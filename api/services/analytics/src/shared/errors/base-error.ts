export interface SerializedError {
  message: string;
}

export interface SerializedResponse {
  error: {
    code: number;
    errors: SerializedError[];
  }
}

export abstract class BaseError extends Error {
  public abstract readonly statusCode: number;

  public constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  public abstract serialize(): SerializedResponse;
}
