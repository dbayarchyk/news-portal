import { BaseError, SerializedResponse } from "./base-error";
import { ValidationError } from "./validation-error";

interface FieldValidationError {
  field: string;
  error: ValidationError;
}

export class FieldsValidationError extends BaseError {
  public readonly statusCode = 400;

  public constructor(public readonly fieldErrors: FieldValidationError[]) {
    super();
    Object.setPrototypeOf(this, FieldsValidationError.prototype);
  }

  public serialize(): SerializedResponse {
    return {
      errors: this.fieldErrors.map((fieldError) => ({
        message: fieldError.error.message,
        field: fieldError.field,
      })),
    }
  }
}
