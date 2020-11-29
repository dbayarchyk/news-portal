import { BaseError, SerializedResponse } from "./base-error";

export class ValidationError extends BaseError {
  public readonly statusCode = 400;
  
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  public serialize(): SerializedResponse {
    return {
      error: {
        code: this.statusCode,
        errors: [
          {
            message: this.message,
          },
        ],
      }
    }
  }
}
