import { Either, left, right } from "../../shared/logic/either";
import { ValueObject } from "../../shared/domain/value-object";
import { ValidationError } from "../../shared/errors/validation-error";

export enum AllowedStatus {
  CONFIRMED = "CONFIRMED",
  UNCONFIRMED = "UNCONFIRMED",
  ARCHIVED = "ARCHIVED",
  COMPROMISED = "COMPROMISED",
  UNKNOWN = "UNKNOWN",
  RESET_REQUIRED = "RESET_REQUIRED",
  FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD",
}

interface StatusData {
  value: AllowedStatus;
}

export class Status extends ValueObject<StatusData> {
  private constructor(data: StatusData) {
    super(data);
  }

  public getValue(): AllowedStatus {
    return this.data.value;
  }

  public static create(value: string): Either<ValidationError, Status> {
    if (!Status.isAllowedStatusValue(value)) {
      return left(
        new ValidationError(
          `Invalid status, only the following statuses are allowed: ${Object.values(
            AllowedStatus
          ).join(", ")}`
        )
      );
    }

    return right(new Status({ value }));
  }

  private static isAllowedStatusValue(value: string): value is AllowedStatus {
    return Object.values(AllowedStatus).includes(value as AllowedStatus);
  }
}
