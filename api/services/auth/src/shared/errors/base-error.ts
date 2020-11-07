export interface SerializedError {
  message: string;
  field?: string;
}

export abstract class BaseError extends Error {
  public constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  public abstract serialize(): SerializedError[];
}
