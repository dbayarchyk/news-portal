import { BaseError, SerializedError } from "./base-error";

export class ValidationError extends BaseError {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  public serialize(): SerializedError[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
